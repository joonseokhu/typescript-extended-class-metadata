import ts from 'typescript';

export interface JSDocMetadata {
  comment: string;
  isDeprecated: boolean;
  tags: { name: string, comment: string }[];
}

export interface ClassMetadata extends JSDocMetadata {
  name: string;
}

export interface ClassElementMetadata extends JSDocMetadata {
  name: string;
  parentClass: ts.ClassDeclaration;
}

export interface ValueTypeMetadata {
  type: ts.Type;
  typeName: string;
  isOptional: boolean;
  isPromise: boolean;
  isArray: boolean;
  isClass: boolean;
  isEnum: boolean;
  classType: ts.ClassDeclaration | undefined;
  enumValue: ts.EnumDeclaration | undefined;
}

export interface ClassMethodMetadata extends ClassElementMetadata {
  isAsync: boolean;
  isStatic: boolean;
  returnType: ValueTypeMetadata;
}

export interface ClassPropertyMetadata extends ClassElementMetadata, ValueTypeMetadata {
  initializer: ts.Expression | undefined;
}
