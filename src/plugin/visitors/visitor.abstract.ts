/* eslint-disable no-bitwise */
import ts from 'typescript';
import { MetadataDecorator } from '../transformer';

export abstract class Visitor<
  Node extends ts.Node = ts.Node,
> {
  protected metadataDecorator: MetadataDecorator;

  protected typeChecker: ts.TypeChecker;

  constructor(
    protected program: ts.Program,
    protected context: ts.TransformationContext,
    protected sourceFile: ts.SourceFile,
  ) {
    this.typeChecker = this.program.getTypeChecker();
    this.metadataDecorator = new MetadataDecorator(program, context, sourceFile);
  }

  protected getType(node: Node) {
    return this.typeChecker.getTypeAtLocation(node);
  }
}
