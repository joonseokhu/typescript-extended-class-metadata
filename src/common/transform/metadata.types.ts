import ts from 'typescript';

interface ClassElementMetadata {
  name: string;
  parentClass: ts.ClassDeclaration;
}

export interface ClassPropertyMetadata extends ClassElementMetadata {
  initializer: ts.Expression | undefined;
  isOptional: boolean;
  isArray: boolean;
  isClass: boolean;
  isEnum: boolean;
  classType: ts.ClassDeclaration | undefined;
  enumType: ts.EnumDeclaration | undefined;
  type: ts.Type;
  typeName: string;
}
