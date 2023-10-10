/* eslint-disable no-bitwise */
import ts from 'typescript';
import { JsDocMetadata } from './js-doc.metadata';
import { Metadata } from './metadata.abstract';
import { serializeValue } from '../serializer';
import { MemberFlag } from '../../lib';

export class MemberMetadata<
  Node extends ts.PropertyDeclaration | ts.MethodDeclaration,
> extends Metadata<Node> {
  public flag: number = 0;

  private jsDoc: JsDocMetadata;

  constructor(
    node: Node,
    type: ts.Type,
    program: ts.Program,
    context: ts.TransformationContext,
  ) {
    super(node, type, program, context);
    this.jsDoc = new JsDocMetadata(this.node, this.type, this.program, this.context);
    this.flag |= this.jsDoc.flag;
    this.parseStatic();
    this.parseNonPublic();
  }

  private parseStatic() {
    const isStatic = this.node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.StaticKeyword) ?? false;

    if (!isStatic) return;
    this.flag |= MemberFlag.Static;
  }

  private parseNonPublic() {
    const isPublic = !this.node.modifiers?.some((modifier) => {
      return [
        ts.SyntaxKind.PrivateKeyword,
        ts.SyntaxKind.ProtectedKeyword,
      ].includes(modifier.kind);
    });

    if (isPublic) return;
    this.flag |= MemberFlag.NonPublic;
  }

  getProperties() {
    return {
      ...this.jsDoc.getProperties(),
      flag: serializeValue.asNumber(this.flag),
    };
  }
}
