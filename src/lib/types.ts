export interface ValueTypeFlags {
  isOptional: boolean;
  isPromise: boolean;
  isArray: boolean;
  isClass: boolean;
  isEnum: boolean;
}

export interface MemberFlags {
  isNotPublic: boolean;
  isDeprecated: boolean;
  isStatic: boolean;
}

export interface ValueTypeMetadata extends ValueTypeFlags {
  flag: number;
  type: string;
  class: Function;
  enum: Record<string, number | string> | undefined;
}

export interface ClassElementMetadata extends MemberFlags {
  flag: number;
  comment: string;
  tags: [string, string][];
}

export interface ClassMethodMetadata extends ClassElementMetadata {}

export type ClassMethodParamTypesMetadata = ValueTypeMetadata[];

export type ClassMethodReturnTypeMetadata = ValueTypeMetadata;

export interface ClassPropertyMetadata extends Omit<ValueTypeMetadata, 'isPromise'>, ClassElementMetadata {
  initializer: any | undefined;
}
