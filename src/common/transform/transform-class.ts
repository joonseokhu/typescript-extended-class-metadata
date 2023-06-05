import ts from 'typescript';
import { createClassElementVisitor } from './create-class-element-visitor';
import { serializePropertyMetadata } from './metadata.serializer';
import { ClassPropertyMetadata } from './metadata.types';

const MetaKey = {
  props: 'rich-meta:props',
} as const;

export const transformClass = (
  program: ts.Program,
  context: ts.TransformationContext,
  sourceFile: ts.SourceFile,
) => (
  node: ts.Node,
): ts.Node => {
  if (!ts.isClassDeclaration(node)) return node;

  const metadata: Record<string, ClassPropertyMetadata> = {};

  const elementVisitor = createClassElementVisitor(
    metadata,
    program,
    context,
    sourceFile,
  );

  node = ts.visitEachChild(node, elementVisitor, context);

  const decorator = context.factory.createDecorator(
    context.factory.createCallExpression(
      context.factory.createIdentifier('Reflect.metadata'),
      undefined,
      [
        context.factory.createStringLiteral(MetaKey.props),
        context.factory.createArrayLiteralExpression(
          Object.values(metadata).map(property => {
            return serializePropertyMetadata(property)
          }),
        ),
      ],
    )
  );

  const prevModifiers = node.modifiers ?? []

  // add decorator to class
  // @ts-ignore
  node.modifiers = [...prevModifiers, decorator];

  return node
}
