export enum MetaName {
  Prop = 'tsemd:prop',
  Method = 'tsemd:method',
  ReturnType = 'tsemd:returntype',
  ParamTypes = 'tsemd:paramtypes',
}

export enum GetterName {
  Props = '_tsemd_props',
  Methods = '_tsemd_methods',
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
  Deprecated = 1 << 10,
  Static = 1 << 11,
  NonPublic = 1 << 12,
}
