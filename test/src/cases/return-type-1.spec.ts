import { expect } from 'chai';
import 'reflect-metadata';
import { ValueTypeName, getMethodNames, getMethodReturnTypeMetadata } from '../../../dist/lib';
import { MyEnum, ReturnTypeTest1, Sub } from './return-type-1';

describe('return type 1', () => {
  it('should have correct method names', () => {
    expect(getMethodNames(ReturnTypeTest1)).to.be.deep.equal([
      'method1',
      'method2',
      'method3',
      'method4',
      'method5',
      'method6',
      'method7',
      'method8',
      'method9',
      'method10',
      'method11',
      'method12',
    ]);
  });

  it('method1 should have correct metadata', () => {
    const data = getMethodReturnTypeMetadata(ReturnTypeTest1.prototype, 'method1');

    expect(data?.type).to.equal(ValueTypeName.Undefined);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(false);
    expect(data?.isPromise).to.equal(false);
  });

  it('method2 should have correct metadata', () => {
    const data = getMethodReturnTypeMetadata(ReturnTypeTest1.prototype, 'method2');

    expect(data?.type).to.equal(ValueTypeName.Null);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(false);
    expect(data?.isPromise).to.equal(false);
  });

  it('method3 should have correct metadata', () => {
    const data = getMethodReturnTypeMetadata(ReturnTypeTest1.prototype, 'method3');

    expect(data?.type).to.equal(ValueTypeName.Boolean);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(false);
    expect(data?.isPromise).to.equal(false);
  });

  it('method4 should have correct metadata', () => {
    const data = getMethodReturnTypeMetadata(ReturnTypeTest1.prototype, 'method4');

    expect(data?.type).to.equal(ValueTypeName.Boolean);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(false);
    expect(data?.isPromise).to.equal(false);
  });

  it('method5 should have correct metadata', () => {
    const data = getMethodReturnTypeMetadata(ReturnTypeTest1.prototype, 'method5');

    expect(data?.type).to.equal(ValueTypeName.Number);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(false);
    expect(data?.isPromise).to.equal(false);
  });

  it('method6 should have correct metadata', () => {
    const data = getMethodReturnTypeMetadata(ReturnTypeTest1.prototype, 'method6');

    expect(data?.type).to.equal(ValueTypeName.Number);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(false);
    expect(data?.isPromise).to.equal(false);
  });

  it('method7 should have correct metadata', () => {
    const data = getMethodReturnTypeMetadata(ReturnTypeTest1.prototype, 'method7');

    expect(data?.type).to.equal(ValueTypeName.String);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(false);
    expect(data?.isPromise).to.equal(false);
  });

  it('method8 should have correct metadata', () => {
    const data = getMethodReturnTypeMetadata(ReturnTypeTest1.prototype, 'method8');

    expect(data?.type).to.equal(ValueTypeName.String);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(false);
    expect(data?.isPromise).to.equal(false);
  });

  it('method9 should have correct metadata', () => {
    const data = getMethodReturnTypeMetadata(ReturnTypeTest1.prototype, 'method9');

    expect(data?.type).to.equal(ValueTypeName.String);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(false);
    expect(data?.isPromise).to.equal(false);

    expect(data?.isEnum).to.equal(true);
    expect(data?.enum).to.equal(MyEnum);
  });

  it('method10 should have correct metadata', () => {
    const data = getMethodReturnTypeMetadata(ReturnTypeTest1.prototype, 'method10');

    expect(data?.type).to.equal(ValueTypeName.Object);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(false);
    expect(data?.isPromise).to.equal(false);

    expect(data?.isClass).to.equal(true);
    expect(data?.class).to.equal(Date);
  });

  it('method11 should have correct metadata', () => {
    const data = getMethodReturnTypeMetadata(ReturnTypeTest1.prototype, 'method11');

    expect(data?.type).to.equal(ValueTypeName.Object);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(false);
    expect(data?.isPromise).to.equal(false);

    expect(data?.isClass).to.equal(true);
    expect(data?.class).to.equal(Sub);
  });

  it('method12 should have correct metadata', () => {
    const data = getMethodReturnTypeMetadata(ReturnTypeTest1.prototype, 'method12');

    expect(data?.type).to.equal(ValueTypeName.Unknown);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(false);
    expect(data?.isPromise).to.equal(false);
  });
});
