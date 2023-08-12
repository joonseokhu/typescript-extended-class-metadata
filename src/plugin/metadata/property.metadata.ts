import ts from 'typescript';
import { MemberMetadata } from './member.metadata';
import { serializeValue } from '../serializer';
import { ValueTypeMetadata } from './value-type.metadata';

export class PropertyMetadata extends MemberMetadata<ts.PropertyDeclaration> {
  private valueType: ValueTypeMetadata;

  private initializer: ts.Expression | undefined;

  constructor(node: ts.PropertyDeclaration, type: ts.Type) {
    super(node, type);
    this.valueType = new ValueTypeMetadata(this.node, this.type);
    this.parseInitializer();
  }

  private parseInitializer() {
    this.initializer = this.node.initializer;
  }

  getProperties() {
    return {
      ...super.getProperties(),
      ...this.valueType.getProperties(),
      initializer: serializeValue.asIdentifier(this.initializer?.getText()),
    };
  }
}
