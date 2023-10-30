/* eslint-disable no-bitwise */
import ts, { TypeFormatFlags } from 'typescript';
import { ValueTypeFlag, ValueTypeName } from '../../common/constants';
import * as parse from '../parser';
import { serializeValue } from '../serializer';
import { Metadata } from './metadata.abstract';
import { getRelativePath } from '../relative-path';

export class ValueTypeMetadata extends Metadata {
  private typeChecker: ts.TypeChecker;

  public flag: number = 0;

  private typeName: ValueTypeName = ValueTypeName.Unknown;

  private className: string | undefined;
  // private className: ts.Expression | undefined;

  private enumName: string | undefined;

  constructor(
    node: ts.Node,
    type: ts.Type,
    program: ts.Program,
    context: ts.TransformationContext,
    // sourceFile: ts.SourceFile,
  ) {
    super(node, type, program, context);
    this.typeChecker = this.program.getTypeChecker();
    this.parsePromise();
    this.parseOptional();
    this.parseArray();
    // this.parseUnion();
    this.parseClass();
    this.parseEnum();
    this.parsePrimitive();
  }

  private parseOptional() {
    const [isOptional, optionalType] = parse.parseOptionalType(this.type, this.node);
    if (!isOptional) return;
    this.type = optionalType;
    this.flag |= ValueTypeFlag.Optional;
  }

  private parsePromise() {
    const [isPromise, promiseResolvedType] = parse.parsePromise(this.type, this.node);
    if (!isPromise) return;
    this.type = promiseResolvedType;
    this.flag |= ValueTypeFlag.Promise;
  }

  private parseArray() {
    const [isArray, arrayItemType] = parse.parseArray(this.type, this.node);
    if (!isArray) return;
    this.type = arrayItemType;
    this.flag |= ValueTypeFlag.Array;
  }

  // private parseUnion() {
  //   const [isUnion, unionTypes] = parse.parseUnion(this.type);
  //   if (isUnion) this.type = unionTypes;
  //   return isUnion;
  // }

  private parseImportedType(name: string) {
    const formatFlags = 0
    | TypeFormatFlags.UseTypeOfFunction
    | TypeFormatFlags.UseFullyQualifiedType
    | TypeFormatFlags.NoTruncation
    | TypeFormatFlags.WriteTypeArgumentsOfSignature;

    const str = this.typeChecker.typeToString(
      this.type,
      undefined,
      formatFlags,
    );
    const sourceFileName = this.node.getSourceFile().fileName;
    const cwd = process.cwd();

    const name1 = this.node.getFirstToken()?.getText();
    // // console.log(this.node.getFirstToken()?.getText());
    // if (name1 === 'myEnum1') {
    //   console.log({
    //     name,
    //     str,
    //     sourceFileName,
    //     cwd,
    //   });
    // }

    if (!str.startsWith('import("')) return name;

    return str.replace(/\("([^"]+)"\)/, (match, p1) => {
      const relativePath = getRelativePath(p1, sourceFileName, cwd);
      return `("${relativePath}")`;
    }).replace(/^import/, 'require')
      .replace(/<[A-Za-z0-9]+>/, '');
  }

  private parseClass() {
    const [isClass, className] = parse.parseClass(this.type, this.node);
    if (!isClass) return;

    this.flag |= ValueTypeFlag.Class;
    this.typeName = ValueTypeName.Object;
    this.className = this.parseImportedType(className); // className;
  }

  private parseEnum() {
    const [isEnum, enumName] = parse.parseEnum(this.type, this.node);
    if (!isEnum) return;
    this.flag |= ValueTypeFlag.Enum;
    this.typeName = ValueTypeName.String;
    this.enumName = this.parseImportedType(enumName); // enumName;
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
      enum: this.enumName
        ? serializeValue.asIdentifier(this.enumName)
        : undefined,
      class: this.className
        ? serializeValue.asIdentifier(this.className)
        : undefined,
    };
  }
}
