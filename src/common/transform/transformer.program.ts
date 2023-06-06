import ts from 'typescript';
import { createClassVisitor } from './transformer.class-visitor';

export const transformerProgram = (program: ts.Program, config?: any): ts.TransformerFactory<any> => {
  return (context: ts.TransformationContext): ts.Transformer<any> => {
    return (sourceFile: ts.SourceFile): ts.SourceFile => {
      const visitor = (node: ts.Node): ts.Node => {
        if (!node) return ts.visitEachChild(node, visitor, context);
        if (!node.parent) return ts.visitEachChild(node, visitor, context);

        return createClassVisitor(program, context, sourceFile)(node);
      }
      return ts.visitNode(sourceFile, visitor);
    }
  }
};
