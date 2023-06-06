import ts from 'typescript';
import { parsePropertyDeclaration } from './metadata.parser';
import { serializePropertyMetadata } from './metadata.serializer';
import { MetaKey } from './transformer.constants';

export const createClassElementVisitor = (
  metadata: any,
  program: ts.Program,
  context: ts.TransformationContext,
  sourceFile: ts.SourceFile,
) => (node: ts.Node): ts.Node => {
  if (!ts.isClassElement(node)) return node;
  const type = program.getTypeChecker().getTypeAtLocation(node);

  if (ts.isPropertyDeclaration(node)) {
    const parsed = parsePropertyDeclaration(node, type);

    metadata[parsed.name] = parsed;

    serializePropertyMetadata(parsed);

    const decorator = context.factory.createDecorator(
      context.factory.createCallExpression(
        context.factory.createIdentifier('Reflect.metadata'),
        undefined,
        [
          context.factory.createStringLiteral(MetaKey.prop),
          serializePropertyMetadata(parsed),
        ],
      )
    );

    const prevModifiers = node.modifiers ?? [];
    const nextModifiers = [...prevModifiers, decorator];

    // @ts-ignore
    node.modifiers = nextModifiers;

    return node;
  }

  return node;
}
