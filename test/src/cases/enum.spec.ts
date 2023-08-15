import 'reflect-metadata';
import { expect } from 'chai';
import { ValueTypeName, getPropertyMetadata, getPropertyNames } from '../../../dist/lib';
import { EnumTest, MyEnum } from './enum';

describe('enum', () => {
  it('should have correct property names', () => {
    expect(getPropertyNames(EnumTest)).to.be.deep.equal([
      'myEnum1',
      'myEnum2',
      'myEnum3',
      'myEnum4',
      'myEnum5',
      'myEnum6',
      'myEnum7',
      'myEnums1',
      'myEnums2',
      'myEnums3',
      'myEnums4',
      'myEnums5',
      'myEnums6',
      'myEnums7',
    ]);
  });

  it('myEnum1 should have correct metadata', () => {
    const data = getPropertyMetadata(EnumTest.prototype, 'myEnum1');

    expect(data?.type).to.equal(ValueTypeName.Enum);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.equal(undefined);
    expect(data?.isEnum).to.equal(true);
    expect(data?.enum).to.deep.equal(MyEnum);
  });

  it('myEnum2 should have correct metadata', () => {
    const data = getPropertyMetadata(EnumTest.prototype, 'myEnum2');

    expect(data?.type).to.equal(ValueTypeName.Enum);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.equal(MyEnum.a);
    expect(data?.isEnum).to.equal(true);
    expect(data?.enum).to.deep.equal(MyEnum);
  });

  it('myEnum3 should have correct metadata', () => {
    const data = getPropertyMetadata(EnumTest.prototype, 'myEnum3');

    expect(data?.type).to.equal(ValueTypeName.Enum);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.equal(MyEnum.b);
    expect(data?.isEnum).to.equal(true);
    expect(data?.enum).to.deep.equal(MyEnum);
  });

  it('myEnum4 should have correct metadata', () => {
    const data = getPropertyMetadata(EnumTest.prototype, 'myEnum4');

    expect(data?.type).to.equal(ValueTypeName.Enum);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.equal(undefined);
    expect(data?.isEnum).to.equal(true);
    expect(data?.enum).to.deep.equal(MyEnum);
  });

  it('myEnum5 should have correct metadata', () => {
    const data = getPropertyMetadata(EnumTest.prototype, 'myEnum5');

    expect(data?.type).to.equal(ValueTypeName.Enum);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.equal(undefined);
    expect(data?.isEnum).to.equal(true);
    expect(data?.enum).to.deep.equal(MyEnum);
  });

  it('myEnum6 should have correct metadata', () => {
    const data = getPropertyMetadata(EnumTest.prototype, 'myEnum6');

    expect(data?.type).to.equal(ValueTypeName.Enum);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.equal(MyEnum.a);
    expect(data?.isEnum).to.equal(true);
    expect(data?.enum).to.deep.equal(MyEnum);
  });

  it('myEnum7 should have correct metadata', () => {
    const data = getPropertyMetadata(EnumTest.prototype, 'myEnum7');

    expect(data?.type).to.equal(ValueTypeName.Enum);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.equal(MyEnum.b);
    expect(data?.isEnum).to.equal(true);
    expect(data?.enum).to.deep.equal(MyEnum);
  });

  it('myEnums1 should have correct metadata', () => {
    const data = getPropertyMetadata(EnumTest.prototype, 'myEnums1');

    expect(data?.type).to.equal(ValueTypeName.Enum);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.equal(undefined);
    expect(data?.isEnum).to.equal(true);
    expect(data?.enum).to.deep.equal(MyEnum);
  });

  it('myEnums2 should have correct metadata', () => {
    const data = getPropertyMetadata(EnumTest.prototype, 'myEnums2');

    expect(data?.type).to.equal(ValueTypeName.Enum);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.deep.equal([]);
    expect(data?.isEnum).to.equal(true);
    expect(data?.enum).to.deep.equal(MyEnum);
  });

  it('myEnums3 should have correct metadata', () => {
    const data = getPropertyMetadata(EnumTest.prototype, 'myEnums3');

    expect(data?.type).to.equal(ValueTypeName.Enum);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.deep.equal([MyEnum.a]);
    expect(data?.isEnum).to.equal(true);
    expect(data?.enum).to.deep.equal(MyEnum);
  });

  it('myEnums4 should have correct metadata', () => {
    const data = getPropertyMetadata(EnumTest.prototype, 'myEnums4');

    expect(data?.type).to.equal(ValueTypeName.Enum);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.equal(undefined);
    expect(data?.isEnum).to.equal(true);
    expect(data?.enum).to.deep.equal(MyEnum);
  });

  it('myEnums5 should have correct metadata', () => {
    const data = getPropertyMetadata(EnumTest.prototype, 'myEnums5');

    expect(data?.type).to.equal(ValueTypeName.Enum);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.equal(undefined);
    expect(data?.isEnum).to.equal(true);
    expect(data?.enum).to.deep.equal(MyEnum);
  });

  it('myEnums6 should have correct metadata', () => {
    const data = getPropertyMetadata(EnumTest.prototype, 'myEnums6');

    expect(data?.type).to.equal(ValueTypeName.Enum);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.deep.equal([]);
    expect(data?.isEnum).to.equal(true);
    expect(data?.enum).to.deep.equal(MyEnum);
  });

  it('myEnums7 should have correct metadata', () => {
    const data = getPropertyMetadata(EnumTest.prototype, 'myEnums7');

    expect(data?.type).to.equal(ValueTypeName.Enum);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.deep.equal([MyEnum.b]);
    expect(data?.isEnum).to.equal(true);
    expect(data?.enum).to.deep.equal(MyEnum);
  });
});
