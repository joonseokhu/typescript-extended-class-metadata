import ts from 'typescript';

export const serializeValue = {
  asString: (value: string) => ts.factory.createStringLiteral(value),
  asNumber: (value: number) => ts.factory.createNumericLiteral(value),
  asBoolean: (value: boolean) => ts.factory.createIdentifier(value ? 'true' : 'false'),
  asIdentifier: (value: string = 'undefined') => ts.factory.createIdentifier(value),
  asOptionalIdentifier: (value: string = 'undefined') => (value !== 'undefined' ? ts.factory.createIdentifier(value) : undefined),
  asRecord: (value: Record<string, ts.Expression | undefined>, multiLine = false) => {
    const properties = Object
      .entries(value)
      .filter(([_, el]) => el !== undefined)
      .map(([key, el]) => ts.factory.createPropertyAssignment(
        ts.factory.createStringLiteral(key),
        el as ts.Expression,
      ));
    return ts.factory.createObjectLiteralExpression(properties, multiLine);
  },
  asArray: (value: ts.Expression[]) => ts.factory.createArrayLiteralExpression(value),
};
