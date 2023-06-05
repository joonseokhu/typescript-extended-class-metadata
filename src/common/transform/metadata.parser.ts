import ts from 'typescript';
import * as parse from '../parser'
import { ClassPropertyMetadata } from './metadata.types';

export const parseMethodDeeclaration = (node: ts.MethodDeclaration, type: ts.Type) => {
  // get method name
  const name = node.name.getText();

  // get class of method
  const classDeclaration = node.parent as ts.ClassDeclaration;

  // get if class property is optional
  const isOptional = node.questionToken;

  // get method return type
  const returnType = type.getCallSignatures()[0].getReturnType();

  // get if method is static
  const isStatic = node.modifiers?.some(modifier => modifier.kind === ts.SyntaxKind.StaticKeyword);

  // get if return type is promise
  const isPromise = returnType.symbol?.name === 'Promise';

  // get type of promise result
  const promiseResultType = isPromise ? (returnType as any)?.typeArguments?.[0] : undefined;

  // get if method is async
  const isAsync = node.modifiers?.some(modifier => modifier.kind === ts.SyntaxKind.AsyncKeyword);

  return {
    name,
    classDeclaration,
    isOptional,
    returnType,
    isStatic,
    isPromise,
    promiseResultType,
    isAsync,
  }
}

export const parsePropertyDeclaration = (node: ts.PropertyDeclaration, type: ts.Type): ClassPropertyMetadata => {
  // get name of class property
  const name = node.name.getText();
  // get class of method
  const parentClass = node.parent as ts.ClassDeclaration;
  // get initial value of class property
  const initializer = node.initializer;
  
  let parsedType = type;
  
  console.log('-----------')
  console.log(name, type.flags, ts.TypeFlags[type.flags])

  const [isOptional, optionalType] = parse.parseOptionalType(parsedType);
  if (isOptional) parsedType = optionalType;
  
  const [isArray, arrayItemType] = parse.parseArray(parsedType);
  if (isArray) parsedType = arrayItemType;

  const [isClass, classType] = parse.parseClass(parsedType);
  const [isEnum, enumType] = parse.parseEnum(parsedType);

  const typeName = (() => {
    if (isEnum) return enumType.name.getText();
    if (isClass) return classType.name?.getText() ?? 'Object';
    if (parse.isStringType(parsedType)) return 'String';
    if (parse.isNumberType(parsedType)) return 'Number';
    if (parse.isBooleanType(parsedType)) return 'Boolean';
    // if (parsedType.symbol) return parsedType.symbol.name;
    return 'undefined';
  })();

  console.log('typeName', typeName)
  console.log('-----------')

  return {
    name,
    parentClass: parentClass,
    initializer,
    isOptional,
    type: parsedType,
    typeName,
    isArray,
    isClass,
    classType,
    isEnum,
    enumType,
  }
}
