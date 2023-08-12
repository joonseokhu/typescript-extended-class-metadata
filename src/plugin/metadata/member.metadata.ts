import ts from 'typescript';
import { JsDocMetadata } from './js-doc.metadata';
import { Metadata } from './metadata.abstract';
import { serializeValue } from '../serializer';

export class MemberMetadata<
  Node extends ts.PropertyDeclaration | ts.MethodDeclaration,
> extends Metadata<Node> {
  public name: string = '';

  private jsDoc: JsDocMetadata;

  constructor(
    node: Node,
    type: ts.Type,
  ) {
    super(node, type);
    this.jsDoc = new JsDocMetadata(this.node, this.type);
    this.parseName();
  }

  private parseName() {
    this.name = this.node.name.getText();
  }

  getProperties() {
    return {
      ...this.jsDoc.getProperties(),
      name: serializeValue.asString(this.name),
    };
  }
}
