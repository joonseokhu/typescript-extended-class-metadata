/* eslint-disable no-bitwise */
import ts from 'typescript';
import * as Output from '../../lib/types';
import { Metadata } from './metadata.abstract';
import * as parse from '../parser';
import { serializeValue } from '../serializer';
import { ValueTypeName } from '../../common/constants';

export class ValueTypeMetadata extends Metadata {
  private flag: Output.ValueTypeFlag = 0;

  private typeName: ValueTypeName = ValueTypeName.Unknown;

  private className: string = 'undefined';

  private enumName: string = 'undefined';

  constructor(node: ts.Node, type: ts.Type) {
    super(node, type);
    this.parsePromise();
    this.parseOptional();
    this.parseArray();
    // this.parseUnion();
    this.parseClass();
    this.parseEnum();
    this.parsePrimitive();
  }

  private parseOptional() {
    const [isOptional, optionalType] = parse.parseOptionalType(this.type);
    if (!isOptional) return;
    this.type = optionalType;
    this.flag |= Output.ValueTypeFlag.Optional;
  }

  private parsePromise() {
    const [isPromise, promiseResolvedType] = parse.parsePromise(this.type);
    if (!isPromise) return;
    this.type = promiseResolvedType;
    this.flag |= Output.ValueTypeFlag.Promise;
  }

  private parseArray() {
    const [isArray, arrayItemType] = parse.parseArray(this.type);
    if (!isArray) return;
    this.type = arrayItemType;
    this.flag |= Output.ValueTypeFlag.Array;
  }

  // private parseUnion() {
  //   const [isUnion, unionTypes] = parse.parseUnion(this.type);
  //   if (isUnion) this.type = unionTypes;
  //   return isUnion;
  // }

  private parseClass() {
    const [isClass, classType] = parse.parseClass(this.type);
    if (!isClass) return;
    this.flag |= Output.ValueTypeFlag.Class;
    this.typeName = ValueTypeName.Class;
    this.className = classType.name?.getText() ?? 'Object';
  }

  private parseEnum() {
    const [isEnum, enumValue] = parse.parseEnum(this.type);
    if (!isEnum) return;
    this.flag |= Output.ValueTypeFlag.Enum;
    this.typeName = ValueTypeName.Enum;
    this.enumName = enumValue.name?.getText() ?? 'undefined';
  }

  private parsePrimitive() {
    if (parse.isStringType(this.type)) this.typeName = ValueTypeName.String;
    if (parse.isNumberType(this.type)) this.typeName = ValueTypeName.Number;
    if (parse.isBooleanType(this.type)) this.typeName = ValueTypeName.Boolean;
    if (parse.isNullType(this.type)) this.typeName = ValueTypeName.Null;
    if (parse.isUndefinedType(this.type)) this.typeName = ValueTypeName.Undefined;
  }

  getProperties() {
    return {
      type: serializeValue.asString(this.typeName),
      flag: serializeValue.asNumber(this.flag),
      enum: serializeValue.asIdentifier(this.enumName),
      class: serializeValue.asIdentifier(this.className),
    };
  }
}
