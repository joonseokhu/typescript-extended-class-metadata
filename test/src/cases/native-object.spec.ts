import 'reflect-metadata';
import { expect } from 'chai';
import { getPropertyMetadata, getPropertyNames, ValueTypeName } from '../../../dist/lib';
import { NativeObjectTest } from './native-object';

describe('native object Test', () => {
  it('should have correct property names', () => {
    expect(getPropertyNames(NativeObjectTest)).to.be.deep.equal([
      'date1',
      'date2',
      'date3',
      'date4',
      'regex1',
      'regex2',
      'regex3',
      'regex4',
      'set1',
      'set2',
      'set3',
      'set4',
    ]);
  });

  it('date1 should have correct metadata', () => {
    const data = getPropertyMetadata(NativeObjectTest.prototype, 'date1');

    expect(data?.type).to.equal(ValueTypeName.Object);
    expect(data?.class).to.equal(Date);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.equal(undefined);
  });

  it('date2 should have correct metadata', () => {
    const data = getPropertyMetadata(NativeObjectTest.prototype, 'date2');

    expect(data?.type).to.equal(ValueTypeName.Object);
    expect(data?.class).to.equal(Date);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.be.an.instanceOf(Date);
  });

  it('date3 should have correct metadata', () => {
    const data = getPropertyMetadata(NativeObjectTest.prototype, 'date3');

    expect(data?.type).to.equal(ValueTypeName.Object);
    expect(data?.class).to.equal(Date);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.equal(undefined);
  });

  it('date4 should have correct metadata', () => {
    const data = getPropertyMetadata(NativeObjectTest.prototype, 'date4');

    expect(data?.type).to.equal(ValueTypeName.Object);
    expect(data?.class).to.equal(Date);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.equal(undefined);
  });

  it('regex1 should have correct metadata', () => {
    const data = getPropertyMetadata(NativeObjectTest.prototype, 'regex1');

    expect(data?.type).to.equal(ValueTypeName.Object);
    expect(data?.class).to.equal(RegExp);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.equal(undefined);
  });

  it('regex2 should have correct metadata', () => {
    const data = getPropertyMetadata(NativeObjectTest.prototype, 'regex2');

    expect(data?.type).to.equal(ValueTypeName.Object);
    expect(data?.class).to.equal(RegExp);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.be.an.instanceOf(RegExp);
  });

  it('regex3 should have correct metadata', () => {
    const data = getPropertyMetadata(NativeObjectTest.prototype, 'regex3');

    expect(data?.type).to.equal(ValueTypeName.Object);
    expect(data?.class).to.equal(RegExp);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.equal(undefined);
  });

  it('regex4 should have correct metadata', () => {
    const data = getPropertyMetadata(NativeObjectTest.prototype, 'regex4');

    expect(data?.type).to.equal(ValueTypeName.Object);
    expect(data?.class).to.equal(RegExp);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.equal(undefined);
  });

  it('set1 should have correct metadata', () => {
    const data = getPropertyMetadata(NativeObjectTest.prototype, 'set1');

    expect(data?.type).to.equal(ValueTypeName.Object);
    expect(data?.class).to.equal(Set);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.equal(undefined);
  });

  it('set2 should have correct metadata', () => {
    const data = getPropertyMetadata(NativeObjectTest.prototype, 'set2');

    expect(data?.type).to.equal(ValueTypeName.Object);
    expect(data?.class).to.equal(Set);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.be.an.instanceOf(Set);
  });

  it('set3 should have correct metadata', () => {
    const data = getPropertyMetadata(NativeObjectTest.prototype, 'set3');

    expect(data?.type).to.equal(ValueTypeName.Object);
    expect(data?.class).to.equal(Set);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.equal(undefined);
  });

  it('set4 should have correct metadata', () => {
    const data = getPropertyMetadata(NativeObjectTest.prototype, 'set4');

    expect(data?.type).to.equal(ValueTypeName.Object);
    expect(data?.class).to.equal(Set);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.equal(undefined);
  });
});
