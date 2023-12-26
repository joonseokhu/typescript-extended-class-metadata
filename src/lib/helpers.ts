/* eslint-disable no-bitwise */
import {
  MetaName, GetterName, ValueTypeFlag, MemberFlag,
} from '../common/constants';
import {
  ClassMethodMetadata,
  ClassPropertyMetadata,
  ValueTypeFlags,
  ClassMethodParamTypesMetadata,
  ClassMethodReturnTypeMetadata,
  MemberFlags,
} from './types';

export const parseValueTypeFlag = (flag: ValueTypeFlag): ValueTypeFlags => {
  return {
    isOptional: !!(flag & ValueTypeFlag.Optional),
    isPromise: !!(flag & ValueTypeFlag.Promise),
    isArray: !!(flag & ValueTypeFlag.Array),
    isClass: !!(flag & ValueTypeFlag.Class),
    isEnum: !!(flag & ValueTypeFlag.Enum),
  };
};

export const parseMemberFlag = (flag: number): MemberFlags => {
  return {
    isNotPublic: !!(flag & MemberFlag.NonPublic),
    isStatic: !!(flag & MemberFlag.Static),
    isDeprecated: !!(flag & MemberFlag.Deprecated),
  };
};

/**
 * get property names of class
 * @param target - target class
 * @param own - whether to get own property names
 * (default: false, get all property names including inherited property names)
 * @returns - property names of class
 */
export const getPropertyNames = (target: object, own = false): string[] => {
  const ret = (target as any)[GetterName.Props]?.(own);
  return Array.from(new Set(ret));
};

/**
 * get method names of class
 * @param target - target class
 * @param own - whether to get own method names
 * (default: false, get all method names including inherited method names)
 * @returns - method names of class
 */
export const getMethodNames = (target: object, own = false): string[] => {
  const ret = (target as any)[GetterName.Methods]?.(own);
  return Array.from(new Set(ret));
};

export const getMetadata = (metaKey: MetaName, target: object, propertyKey: string | symbol) => {
  // return (target as any)[GetterName.Metadata]?.()?.[propertyKey]?.[metaKey];
  let res: any = target.constructor;
  res = res[GetterName.Metadata];
  res = res?.();
  res = res?.[propertyKey];
  res = res?.[metaKey];
  return res;
};

/**
 * get metadata of property
 * @param target - target class
 * @param propertyKey - property key
 * @returns - metadata of property
 */
export const getPropertyMetadata = (
  target: object,
  propertyKey: string | symbol,
): ClassPropertyMetadata | undefined => {
  const metadata = getMetadata(MetaName.Prop, target, propertyKey);
  if (!metadata) return undefined;
  return {
    ...metadata,
    ...parseValueTypeFlag(metadata?.flag ?? 0),
    ...parseMemberFlag(metadata?.flag ?? 0),
  };
};

/**
 * get metadata of method
 * @param target - target class
 * @param propertyKey - property key
 * @returns - metadata of method
 */
export const getMethodMetadata = (
  target: object,
  propertyKey: string | symbol,
): ClassMethodMetadata | undefined => {
  (target as any)[GetterName.Metadata]?.();
  const metadata = getMetadata(MetaName.Method, target, propertyKey);
  if (!metadata) return undefined;
  return {
    ...metadata,
    ...parseMemberFlag(metadata?.flag ?? 0),
  };
};

export const getMethodParamTypesMetadata = (
  target: object,
  propertyKey: string | symbol,
): ClassMethodParamTypesMetadata[] | undefined => {
  (target as any)[GetterName.Metadata]?.();
  const metadata = getMetadata(MetaName.ParamTypes, target, propertyKey);
  if (!metadata) return undefined;
  return metadata.map((item: any) => ({
    ...item,
    ...parseValueTypeFlag(item?.flag ?? 0),
  }));
};

export const getMethodReturnTypeMetadata = (
  target: object,
  propertyKey: string | symbol,
): ClassMethodReturnTypeMetadata | undefined => {
  (target as any)[GetterName.Metadata]?.();
  const metadata = getMetadata(MetaName.ReturnType, target, propertyKey);
  if (!metadata) return undefined;
  return {
    ...metadata,
    ...parseValueTypeFlag(metadata?.flag ?? 0),
  };
};
