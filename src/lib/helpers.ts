/* eslint-disable no-bitwise */
import { MetaNames, GetterNames } from '../common/constants';
import {
  ClassMethodMetadata, ClassPropertyMetadata, ValueType, ValueTypeFlag,
} from './types';

export const parseValueTypeFlag = (flag: ValueTypeFlag): ValueType => {
  return {
    isOptional: !!(flag & ValueTypeFlag.Optional),
    isPromise: !!(flag & ValueTypeFlag.Promise),
    isArray: !!(flag & ValueTypeFlag.Array),
    isClass: !!(flag & ValueTypeFlag.Class),
    isEnum: !!(flag & ValueTypeFlag.Enum),
  };
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
  const metadata = Reflect.getMetadata(MetaNames.prop, target, propertyKey);
  if (!metadata) return undefined;
  return { ...metadata, ...parseValueTypeFlag(metadata?.flag ?? 0) };
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
  const metadata = Reflect.getMetadata(MetaNames.method, target, propertyKey);
  if (!metadata) return undefined;
  return { ...metadata, ...parseValueTypeFlag(metadata?.flag ?? 0) };
};

/**
 * get property names of class
 * @param target - target class
 * @param own - whether to get own property names
 * (default: false, get all property names including inherited property names)
 * @returns - property names of class
 */
export const getPropertyNames = (target: object, own = false): string[] => {
  return (target as any)[GetterNames.props]?.(own);
};

/**
 * get method names of class
 * @param target - target class
 * @param own - whether to get own method names
 * (default: false, get all method names including inherited method names)
 * @returns - method names of class
 */
export const getMethodNames = (target: object, own = false): string[] => {
  return (target as any)[GetterNames.methods]?.(own);
};
