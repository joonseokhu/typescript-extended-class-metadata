/* eslint-disable no-bitwise */
import ts from 'typescript';

export const hasFlag = (flag: number = 0, flags: number[] = []) => {
  return flags.some((f) => (flag & f) === f);
};

export const hasTypeFlag = <T extends ts.Type>(
  flags: ts.TypeFlags[],
) => (
    type: ts.Type,
    strict = false,
  ) => flags.some((flag) => (strict
    ? (type.flags === flag)
    : ((type.flags & flag) === flag)));

export const hasTypeSymbol = (symbolName: string) => (type: ts.Type) => {
  const symbol = type.getSymbol?.() ?? type.symbol ?? undefined;
  return symbol?.name === symbolName;
};

export const getTypeArguments = (type: ts.Type): ts.Type[] => (type as any)?.typeArguments ?? [];

export const getTypeArgument = (
  type: ts.Type,
): ts.Type | undefined => {
  const args = getTypeArguments(type);
  return args.length === 1 ? args[0] : undefined;
};

export type TypeParser<T = ts.Type> = (type: ts.Type) => [true, T] | [false, undefined];

export const useTypeParser = <T = ts.Type>(
  parser: (inputType: ts.Type) => T | false,
): TypeParser<T> => (type: ts.Type): [true, T] | [false, undefined] => {
    const parsed = parser(type);
    return parsed
      ? [true, parsed]
      : [false, undefined];
  };

export const isUnionType = hasTypeFlag<ts.UnionType>([
  ts.TypeFlags.Union,
]);

export const isIntersectionType = hasTypeFlag<ts.IntersectionType>([
  ts.TypeFlags.Intersection,
]);

export const isObjectType = hasTypeFlag<ts.ObjectType>([
  ts.TypeFlags.Object,
]);

export const isUndefinedType = hasTypeFlag([
  ts.TypeFlags.Undefined,
]);

export const isNullType = hasTypeFlag([
  ts.TypeFlags.Null,
]);

export const isBooleanType = hasTypeFlag([
  ts.TypeFlags.Boolean,
  ts.TypeFlags.BooleanLike,
  ts.TypeFlags.BooleanLiteral,
]);

export const isNumberType = hasTypeFlag<ts.NumberLiteralType>([
  ts.TypeFlags.Number,
  ts.TypeFlags.NumberLike,
  ts.TypeFlags.NumberLiteral,
]);

export const isStringType = hasTypeFlag<ts.StringLiteralType>([
  ts.TypeFlags.String,
  ts.TypeFlags.StringLike,
  ts.TypeFlags.StringLiteral,
]);

export const isEnumType = hasTypeFlag<ts.EnumType>([
  ts.TypeFlags.Enum,
  ts.TypeFlags.EnumLike,
  ts.TypeFlags.EnumLiteral,
]);

export const parseUnion = useTypeParser((type) => (isUnionType(type, true)
  ? (type as ts.UnionType).types
  : false));

export const parseOptionalType = useTypeParser((type) => {
  const [isUnion, unionTypes] = parseUnion(type);
  if (!isUnion) return false;
  if (!unionTypes.some((t) => isUndefinedType(t))) return false;
  const restTypes = unionTypes.filter((t) => !isUndefinedType(t));

  if (restTypes.length === 0) return false;

  if (restTypes.length === 1) return restTypes[0];

  if (restTypes.every((t) => isBooleanType(t))) {
    return {
      ...type,
      types: restTypes,
      flags: ts.TypeFlags.Boolean | ts.TypeFlags.Union,
    };
  }

  if (restTypes.every((t) => isEnumType(t))) {
    const members = restTypes.map((t2) => t2.symbol?.declarations?.[0] as ts.EnumMember);

    const parentNode = members
      .map((member) => member.parent)
      .reduce((acc: any, parent) => (acc.name.getText() === parent.name.getText()
        ? acc
        : undefined));

    if (!parentNode) {
      return { ...type, types: restTypes };
    }

    return {
      ...type,
      types: restTypes,
      flags: ts.TypeFlags.EnumLiteral | ts.TypeFlags.Enum | ts.TypeFlags.Union,
      members,
      symbol: {
        ...type.symbol,
        declarations: [parentNode],
      },
    };
  }

  return { ...type, types: restTypes };
});

export const parseArray = useTypeParser((type: ts.Type) => {
  if (!hasTypeSymbol('Array')(type)) return false;
  return getTypeArgument(type) ?? type;
});

export const parsePromise = useTypeParser((type) => {
  if (!hasTypeSymbol('Promise')(type)) return false;
  return getTypeArgument(type) ?? false;
});

/** parse enum type */
// ts.EnumDeclaration, ts.EnumMember[]
export const parseEnum = useTypeParser((type) => {
  if (!isEnumType(type)) return false;

  if (hasFlag(type.symbol?.flags, [ts.SymbolFlags.EnumMember])) {
    const enumMember = type.symbol?.declarations?.[0] as ts.EnumMember;
    const enumType = enumMember.parent as ts.EnumDeclaration;

    if (!enumType) return false;

    return enumType.name.getText();
  }

  const enumType = type.symbol?.declarations?.[0] as ts.EnumDeclaration;

  if (!enumType) return false;

  return enumType.name.getText();
});

export const parseClass = useTypeParser((type: ts.Type) => {
  const declaration = type.symbol?.valueDeclaration;

  if (!declaration) return false;

  if (!hasFlag(type.symbol?.flags ?? 0, [
    ts.SymbolFlags.Class,
    ts.SymbolFlags.Interface,
  ])) return false;

  return type.symbol.escapedName.toString();
});
