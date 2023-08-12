/* eslint-disable no-bitwise */
export enum ValueTypeFlag {
  Unknown = 0,
  Optional = 1 << 0,
  Promise = 1 << 1,
  Array = 1 << 2,
  Class = 1 << 3,
  Enum = 1 << 4,
}

export interface ValueTypeMetadata {
  type: any;
  flag: ValueTypeFlag;
  enum: Record<string, number | string> | undefined;
}

export interface ClassElementMetadata {
  name: string;
  comment: string;
  isDeprecated: boolean;
  tags: { name: string, comment: string }[];
}

export interface ClassMethodMetadata extends ClassElementMetadata {
  isAsync: boolean;
  isStatic: boolean;
  returnType: ValueTypeMetadata;
}

export interface ClassPropertyMetadata extends Omit<ValueTypeMetadata, 'isPromise'>, ClassElementMetadata {
  initializer: any | undefined;
}
