import 'reflect-metadata';
import { expect } from 'chai';
import { ValueTypeName, getPropertyMetadata, getPropertyNames } from '../../../dist/lib';
import { NilTest } from './nil';

describe('nil', () => {
  it('should have correct property names', () => {
    expect(getPropertyNames(NilTest)).to.be.deep.equal([
      'null1',
      'null2',
      'null3',
      'null4',
      'nulls1',
      'nulls2',
      'nulls3',
      'nulls4',
      'nulls5',
      'nulls6',
      'undefined1',
      'undefined2',
      'undefineds1',
      'undefineds2',
      'undefineds3',
      'undefineds4',
      'undefineds5',
      'undefineds6',
    ]);
  });

  it('null1 should have correct metadata', () => {
    const data = getPropertyMetadata(NilTest.prototype, 'null1');

    expect(data?.type).to.equal(ValueTypeName.Null);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.equal(undefined);
  });

  it('null2 should have correct metadata', () => {
    const data = getPropertyMetadata(NilTest.prototype, 'null2');

    expect(data?.type).to.equal(ValueTypeName.Null);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.equal(null);
  });

  it('null3 should have correct metadata', () => {
    const data = getPropertyMetadata(NilTest.prototype, 'null3');

    expect(data?.type).to.equal(ValueTypeName.Null);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.equal(undefined);
  });

  it('null4 should have correct metadata', () => {
    const data = getPropertyMetadata(NilTest.prototype, 'null4');

    expect(data?.type).to.equal(ValueTypeName.Null);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.equal(null);
  });

  it('nulls1 should have correct metadata', () => {
    const data = getPropertyMetadata(NilTest.prototype, 'nulls1');

    expect(data?.type).to.equal(ValueTypeName.Null);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.equal(undefined);
  });

  it('nulls2 should have correct metadata', () => {
    const data = getPropertyMetadata(NilTest.prototype, 'nulls2');

    expect(data?.type).to.equal(ValueTypeName.Null);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.deep.equal([]);
  });

  it('nulls3 should have correct metadata', () => {
    const data = getPropertyMetadata(NilTest.prototype, 'nulls3');

    expect(data?.type).to.equal(ValueTypeName.Null);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.deep.equal([null]);
  });

  it('nulls4 should have correct metadata', () => {
    const data = getPropertyMetadata(NilTest.prototype, 'nulls4');

    expect(data?.type).to.equal(ValueTypeName.Null);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.equal(undefined);
  });

  it('nulls5 should have correct metadata', () => {
    const data = getPropertyMetadata(NilTest.prototype, 'nulls5');

    expect(data?.type).to.equal(ValueTypeName.Null);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.deep.equal([]);
  });

  it('nulls6 should have correct metadata', () => {
    const data = getPropertyMetadata(NilTest.prototype, 'nulls6');

    expect(data?.type).to.equal(ValueTypeName.Null);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.deep.equal([null]);
  });

  it('undefined1 should have correct metadata', () => {
    const data = getPropertyMetadata(NilTest.prototype, 'undefined1');

    expect(data?.type).to.equal(ValueTypeName.Undefined);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.equal(undefined);
  });

  it('undefined2 should have correct metadata', () => {
    const data = getPropertyMetadata(NilTest.prototype, 'undefined2');

    expect(data?.type).to.equal(ValueTypeName.Undefined);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.equal(undefined);
  });

  it('undefineds1 should have correct metadata', () => {
    const data = getPropertyMetadata(NilTest.prototype, 'undefineds1');

    expect(data?.type).to.equal(ValueTypeName.Undefined);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.equal(undefined);
  });

  it('undefineds2 should have correct metadata', () => {
    const data = getPropertyMetadata(NilTest.prototype, 'undefineds2');

    expect(data?.type).to.equal(ValueTypeName.Undefined);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.deep.equal([]);
  });

  it('undefineds3 should have correct metadata', () => {
    const data = getPropertyMetadata(NilTest.prototype, 'undefineds3');

    expect(data?.type).to.equal(ValueTypeName.Undefined);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.deep.equal([undefined]);
  });

  it('undefineds4 should have correct metadata', () => {
    const data = getPropertyMetadata(NilTest.prototype, 'undefineds4');

    expect(data?.type).to.equal(ValueTypeName.Undefined);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.equal(undefined);
  });

  it('undefineds5 should have correct metadata', () => {
    const data = getPropertyMetadata(NilTest.prototype, 'undefineds5');

    expect(data?.type).to.equal(ValueTypeName.Undefined);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.deep.equal([]);
  });

  it('undefineds6 should have correct metadata', () => {
    const data = getPropertyMetadata(NilTest.prototype, 'undefineds6');

    expect(data?.type).to.equal(ValueTypeName.Undefined);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.deep.equal([undefined]);
  });
});
