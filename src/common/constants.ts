export enum MetaName {
  Prop = 'tsemd:p',
  Method = 'tsemd:m',
  ReturnType = 'tsemd:mrt',
  ParamTypes = 'tsemd:mpt',
}

export enum GetterName {
  Props = '_tsemd_pl',
  Methods = '_tsemd_ml',
}

export enum ValueTypeName {
  Unknown = 'unknown',
  Undefined = 'undefined',
  Null = 'null',
  Boolean = 'boolean',
  Number = 'number',
  String = 'string',
  Object = 'object',
}

/* eslint-disable no-bitwise */
export enum ValueTypeFlag {
  Unknown = 0,
  Optional = 1 << 0,
  Promise = 1 << 1,
  Array = 1 << 2,
  Class = 1 << 3,
  Enum = 1 << 4,
}

export enum MemberFlag {
  Unknown = 0,
  Public = 1 << 10,
  Static = 1 << 11,
  Deprecated = 1 << 12,
}
