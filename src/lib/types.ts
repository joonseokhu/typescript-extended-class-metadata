export interface ValueTypeMetadata {
  type: any;
  isOptional: boolean;
  isPromise: boolean;
  isArray: boolean;
  isClass: boolean;
  isEnum: boolean;
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
