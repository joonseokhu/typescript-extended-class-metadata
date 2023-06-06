import ts from 'typescript';
import { createClassElementVisitor } from './transformer.class-element-visitor';
import { serializePropertyMetadata } from './metadata.serializer';
import { ClassPropertyMetadata } from './metadata.types';
import { MetaKey } from './transformer.constants';

export const createClassVisitor = (
  program: ts.Program,
  context: ts.TransformationContext,
  sourceFile: ts.SourceFile,
) => (node: ts.Node): ts.Node => {
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

  if (ts.canHaveDecorators(node)) {
    const prevModifiers = node.modifiers ?? []
    // @ts-ignore
    node.modifiers = [...prevModifiers, decorator];
  }

  return node
}
