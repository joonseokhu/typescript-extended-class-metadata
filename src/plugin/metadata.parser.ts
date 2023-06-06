import ts from 'typescript';
import * as parse from './parser';
import {
  ClassElementMetadata, ClassMethodMetadata, ClassPropertyMetadata, ValueTypeMetadata,
} from './metadata.types';

export const parseClass = (
  node: ts.ClassDeclaration,
) => {
  // get inherited class
  const heritageClauses = node.heritageClauses ?? [];
  const extendsClause = heritageClauses.find((clause) => clause.token === ts.SyntaxKind.ExtendsKeyword);
  const extendsType = extendsClause?.types?.[0];

  // console.log('extendsType', extendsType?.getText())

  return {
    ...parse.parseJSDoc(node),
    name: node.name?.getText() ?? '',
  };
};

export const parseClassElement = (
  node: ts.PropertyDeclaration | ts.MethodDeclaration,
): ClassElementMetadata => {
  // get name of class property
  const name = node.name.getText();
  // get class of method
  const parentClass = node.parent as ts.ClassDeclaration;

  return {
    ...parse.parseJSDoc(node),
    name,
    parentClass,
  };
};

export const parseValueType = (type: ts.Type): ValueTypeMetadata => {
  let parsedType = type;

  const [isOptional, optionalType] = parse.parseOptionalType(parsedType);
  if (isOptional) parsedType = optionalType;

  const [isPromise, promiseResolvedType] = parse.parsePromise(parsedType);
  if (isPromise) parsedType = promiseResolvedType;

  const [isArray, arrayItemType] = parse.parseArray(parsedType);
  if (isArray) parsedType = arrayItemType;

  // const [isUnion, unionTypes] = parse.parseUnion(parsedType);
  // console.log('isUnion', isUnion)

  const [isClass, classType] = parse.parseClass(parsedType);
  const [isEnum, enumValue] = parse.parseEnum(parsedType);

  const typeName = (() => {
    if (isEnum) return 'String';
    if (isClass) return classType.name?.getText() ?? 'Object';
    if (parse.isStringType(parsedType)) return 'String';
    if (parse.isNumberType(parsedType)) return 'Number';
    if (parse.isBooleanType(parsedType)) return 'Boolean';
    return 'undefined';
  })();

  return {
    type: parsedType,
    typeName,
    isOptional,
    isPromise,
    isArray,
    isClass,
    isEnum,
    classType,
    enumValue,
  };
};

export const parsePropertyDeclaration = (node: ts.PropertyDeclaration, type: ts.Type): ClassPropertyMetadata => ({
  ...parseClassElement(node),
  ...parseValueType(type),
  initializer: node.initializer,
});

export const parseMethodDeeclaration = (node: ts.MethodDeclaration, type: ts.Type): ClassMethodMetadata => {
  // get if method is static
  const isStatic = node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.StaticKeyword) ?? false;

  // get if return type is promise

  // get type of promise result
  // const promiseResultType = isPromise ? (returnType as any)?.typeArguments?.[0] : undefined;

  // get if method is async
  const isAsync = node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.AsyncKeyword) ?? false;

  const returnType = type.getCallSignatures()[0].getReturnType();
  const returnTypeMeta = parseValueType(returnType);

  return {
    ...parseClassElement(node),
    isStatic,
    isAsync,
    returnType: returnTypeMeta,
  };
};
