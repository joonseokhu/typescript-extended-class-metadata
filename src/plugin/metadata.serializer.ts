import ts from 'typescript';
import {
  ClassElementMetadata, ClassMethodMetadata, ClassPropertyMetadata, JSDocMetadata, ValueTypeMetadata,
} from './metadata.types';
import { ObjectSerializerMap, serializeValue, useSerializeObject } from './serializer';

const valueTypeMetadataSerializers: ObjectSerializerMap<ValueTypeMetadata> = {
  type: (value) => serializeValue.asIdentifier('undefined'),
  typeName: (value) => serializeValue.asIdentifier(value),
  isOptional: (value) => serializeValue.asBoolean(value),
  isPromise: (value) => serializeValue.asBoolean(value),
  isArray: (value) => serializeValue.asBoolean(value),
  isClass: (value) => serializeValue.asBoolean(value),
  isEnum: (value) => serializeValue.asBoolean(value),
  classType: (value) => serializeValue.asIdentifier(value?.name?.getText()),
  enumValue: (value) => serializeValue.asIdentifier(value?.name?.getText()),
};

const jsDocMetadataSerializers: ObjectSerializerMap<JSDocMetadata> = {
  comment: (value) => serializeValue.asString(value),
  isDeprecated: (value) => serializeValue.asBoolean(value),
  tags: (value) => ts.factory.createArrayLiteralExpression(
    value.map((tag) => ts.factory.createObjectLiteralExpression([
      ts.factory.createPropertyAssignment('name', ts.factory.createStringLiteral(tag.name)),
      ts.factory.createPropertyAssignment('comment', ts.factory.createStringLiteral(tag.comment)),
    ])),
  ),
};

const classElementMetadataSerializers: ObjectSerializerMap<ClassElementMetadata> = {
  ...jsDocMetadataSerializers,
  name: (value) => serializeValue.asString(value),
  parentClass: (value) => serializeValue.asIdentifier(value.name?.getText()),
};

const classMethodMetadataSerializers: ObjectSerializerMap<ClassMethodMetadata> = {
  ...classElementMetadataSerializers,
  isAsync: (value) => serializeValue.asBoolean(value),
  isStatic: (value) => serializeValue.asBoolean(value),
  returnType: useSerializeObject(valueTypeMetadataSerializers, (key) => {
    if (key === 'classType') return false;
    if (key === 'enumValue') return 'enum';
    if (key === 'type') return false;
    if (key === 'typeName') return 'type';
    return key;
  }),
};

const classPropertyMetadataSerializers: ObjectSerializerMap<ClassPropertyMetadata> = {
  ...classElementMetadataSerializers,
  ...valueTypeMetadataSerializers,
  initializer: (value) => serializeValue.asIdentifier(value?.getText()),
};

export const metadataSerializers = {
  valueType: useSerializeObject(valueTypeMetadataSerializers, (key) => {
    if (key === 'enumValue') return 'enum';
    if (key === 'type') return false;
    if (key === 'typeName') return 'type';
    return key;
  }),
  classMethod: useSerializeObject(classMethodMetadataSerializers, (key) => {
    if (key === 'parentClass') return false;
    return key;
  }),
  classProperty: useSerializeObject(classPropertyMetadataSerializers, (key) => {
    if (key === 'parentClass') return false;
    if (key === 'isPromise') return false;
    if (key === 'classType') return false;
    if (key === 'enumValue') return 'enum';
    if (key === 'type') return false;
    if (key === 'typeName') return 'type';
    return key;
  }),
};
