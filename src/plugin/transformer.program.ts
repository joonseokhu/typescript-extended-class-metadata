/* eslint-disable arrow-body-style */
import ts from 'typescript';
import { ClassVisitor } from './transformer.class-visitor';

export const transformerProgram = (program: ts.Program, config?: any): ts.TransformerFactory<any> => {
  return (context: ts.TransformationContext): ts.Transformer<any> => {
    return (sourceFile: ts.SourceFile): ts.Node => {
      const visitor = (node: ts.Node): ts.Node => {
        if (!node) return ts.visitEachChild(node, visitor, context);
        if (!node.parent) return ts.visitEachChild(node, visitor, context);

        const classVisitor = new ClassVisitor(
          program,
          context,
          sourceFile,
        );

        return classVisitor.visit(node);
      };
      return ts.visitNode(sourceFile, visitor);
    };
  };
};
