import ts from 'typescript';

export const serializeValue = {
  asString: (value: string) => ts.factory.createStringLiteral(value),
  asNumber: (value: number) => ts.factory.createNumericLiteral(value),
  asBoolean: (value: boolean) => ts.factory.createIdentifier(value ? 'true' : 'false'),
  asIdentifier: (value?: string) => ts.factory.createIdentifier(value ?? 'undefined'),
  asRecord: (value: Record<string, ts.Expression>) => {
    const properties = Object
      .entries(value)
      .map(([key, el]) => ts.factory.createPropertyAssignment(key, el));
    return ts.factory.createObjectLiteralExpression(properties, false);
  },
  asArray: (value: ts.Expression[]) => ts.factory.createArrayLiteralExpression(value),
};
