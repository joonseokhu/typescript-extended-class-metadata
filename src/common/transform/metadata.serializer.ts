import ts from 'typescript';
import { ClassPropertyMetadata } from "./metadata.types";

const serializeValue = {
  asString: (value: string) => ts.factory.createStringLiteral(value),
  asNumber: (value: number) => ts.factory.createNumericLiteral(value),
  asBoolean: (value: boolean) => ts.factory.createIdentifier(value ? 'true' : 'false'),
  asIdentifier: (value?: string) => ts.factory.createIdentifier(value ?? 'undefined'),
}

export const serializePropertyMetadata = (
  metadata: ClassPropertyMetadata
): ts.ObjectLiteralExpression => {
  const properties: [string, ts.Expression][] = [
    [
      'name',
      serializeValue.asString(metadata.name),
    ],
    [
      'type',
      serializeValue.asIdentifier(metadata.typeName),
    ],
    [
      'isOptional',
      serializeValue.asBoolean(metadata.isOptional),
    ],
    [
      'initializer',
      serializeValue.asIdentifier(metadata.initializer?.getText()),
    ],
    [
      'isArray',
      serializeValue.asBoolean(metadata.isArray),
    ],
    [
      'isClass',
      serializeValue.asBoolean(metadata.isClass),
    ],
    [
      'isEnum',
      serializeValue.asBoolean(metadata.isEnum),
    ],
    [
      'classType',
      serializeValue.asIdentifier(metadata.classType?.name?.getText()),
    ],
    [
      'enumType',
      serializeValue.asIdentifier(metadata.enumType?.name?.getText()),
    ],
  ];

  return ts.factory.createObjectLiteralExpression(
    properties.map(([key, exp]) => {
      return ts.factory.createPropertyAssignment(key, exp)
    }),
    true,
  );
}
