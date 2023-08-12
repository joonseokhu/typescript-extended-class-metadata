import ts from 'typescript';
import { MemberMetadata } from './member.metadata';
import { serializeValue } from '../serializer';
import { ValueTypeMetadata } from './value-type.metadata';

export class MethodMetadata extends MemberMetadata<ts.MethodDeclaration> {
  private returnType: ValueTypeMetadata;

  private isStatic: boolean = false;

  private isAsync: boolean = false;

  constructor(node: ts.MethodDeclaration, type: ts.Type) {
    super(node, type);

    this.parseStatic();
    this.parseAsync();
    this.parseReturnType();
  }

  private parseStatic() {
    this.isStatic = this.node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.StaticKeyword) ?? false;
  }

  private parseAsync() {
    this.isAsync = this.node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.AsyncKeyword) ?? false;
  }

  private parseReturnType() {
    const returnType = this.type.getCallSignatures()[0].getReturnType();
    this.returnType = new ValueTypeMetadata(this.node, returnType);
  }

  getProperties() {
    return {
      ...super.getProperties(),
      isStatic: serializeValue.asBoolean(this.isStatic),
      isAsync: serializeValue.asBoolean(this.isAsync),
      returnType: this.returnType.serialize(),
    };
  }
}
