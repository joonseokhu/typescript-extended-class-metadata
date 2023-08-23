import ts from 'typescript';
import { serializeValue } from '../serializer';

export abstract class Metadata<
  Node extends ts.Node = ts.Node,
  Type extends ts.Type = ts.Type,
> {
  constructor(protected node: Node, protected type: Type) { }

  abstract getProperties(): Record<string, ts.Expression | undefined>;

  serialize(): ts.ObjectLiteralExpression {
    return serializeValue.asRecord(this.getProperties());
  }
}
