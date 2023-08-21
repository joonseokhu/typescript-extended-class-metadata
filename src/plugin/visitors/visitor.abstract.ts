import ts from 'typescript';
import { MetadataDecorator } from '../transformer';

export abstract class Visitor<
  Node extends ts.Node = ts.Node,
> {
  protected metadataDecorator: MetadataDecorator;

  protected decorators: ts.Decorator[] = [];

  protected type: ts.Type;

  constructor(
    protected node: Node,
    protected program: ts.Program,
    protected context: ts.TransformationContext,
    protected sourceFile: ts.SourceFile,
  ) {
    this.type = this.program.getTypeChecker().getTypeAtLocation(this.node);
    this.metadataDecorator = new MetadataDecorator(program, context, sourceFile);
  }

  protected addDecorator(name: string, value: ts.Expression) {
    this.decorators.push(this.metadataDecorator.create(name, value));
  }

  abstract visit(): Node;
}
