/* eslint-disable no-bitwise */
import ts from 'typescript';
import { MemberMetadata } from './member.metadata';
import { serializeValue } from '../serializer';
import { ValueTypeMetadata } from './value-type.metadata';

export class PropertyMetadata extends MemberMetadata<ts.PropertyDeclaration> {
  private valueType: ValueTypeMetadata;

  private initializer: ts.Expression | undefined;

  constructor(
    node: ts.PropertyDeclaration,
    type: ts.Type,
    program: ts.Program,
    context: ts.TransformationContext,
    // sourceFile: ts.SourceFile,
  ) {
    super(node, type, program, context);
    this.valueType = new ValueTypeMetadata(
      this.node,
      this.type,
      this.program,
      this.context,
    );
    this.flag |= this.valueType.flag;
    this.parseInitializer();
  }

  private parseInitializer() {
    this.initializer = this.node.initializer;
  }

  getProperties() {
    return {
      ...super.getProperties(),
      ...this.valueType.getProperties(),
      flag: serializeValue.asNumber(this.flag),
      initializer: this.initializer,
    };
  }
}
