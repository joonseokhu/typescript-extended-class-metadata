import ts from 'typescript';

export type ObjectSerializerMap<T extends Record<string, any>> = {
  [K in keyof T]: (value: T[K]) => ts.Expression;
};

export const serializeObject = <
  T extends Record<string, any>,
>(
    data: T,
    map: ObjectSerializerMap<T>,
    keyMapper?: (key: keyof T) => string | undefined | false,
  ): ts.ObjectLiteralExpression => {
  const properties = Object.entries(data)
    .map(([dataKey, value]) => {
      const resultKey = keyMapper ? (keyMapper(dataKey) ?? dataKey) : dataKey;
      if (!resultKey) return undefined;
      const exp = map[dataKey](value);
      return ts.factory.createPropertyAssignment(resultKey, exp);
    })
    .filter(<T2>(e: T2 | undefined): e is T2 => !!e);
  return ts.factory.createObjectLiteralExpression(properties, false);
};

export const useSerializeObject = <T extends Record<string, any>>(
  map: ObjectSerializerMap<T>,
  keyMapper?: (key: keyof T) => string | undefined | false,
) => (
    data: T,
  ) => serializeObject(data, map, keyMapper);

export const serializeValue = {
  asString: (value: string) => ts.factory.createStringLiteral(value),
  asNumber: (value: number) => ts.factory.createNumericLiteral(value),
  asBoolean: (value: boolean) => ts.factory.createIdentifier(value ? 'true' : 'false'),
  asIdentifier: (value?: string) => ts.factory.createIdentifier(value ?? 'undefined'),
};
