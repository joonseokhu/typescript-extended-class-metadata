import 'reflect-metadata';
import { expect } from 'chai';
import { ValueTypeName, getPropertyMetadata, getPropertyNames } from '../../../dist/lib';
import { NumberTest } from './number';

describe('number', () => {
  it('should have correct property names', () => {
    expect(getPropertyNames(NumberTest)).to.be.deep.equal([
      'num1',
      'num2',
      'num3',
      'num4',
      'num5',
      'num6',
      'num7',
      'nums1',
      'nums2',
      'nums3',
      'nums4',
      'nums5',
      'nums6',
      'nums7',
    ]);
  });

  it('num1 should have correct metadata', () => {
    const data = getPropertyMetadata(NumberTest.prototype, 'num1');

    expect(data?.type).to.equal(ValueTypeName.Number);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.equal(undefined);
  });

  it('num2 should have correct metadata', () => {
    const data = getPropertyMetadata(NumberTest.prototype, 'num2');

    expect(data?.type).to.equal(ValueTypeName.Number);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.equal(1);
  });

  it('num3 should have correct metadata', () => {
    const data = getPropertyMetadata(NumberTest.prototype, 'num3');

    expect(data?.type).to.equal(ValueTypeName.Number);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.equal(0);
  });

  it('num4 should have correct metadata', () => {
    const data = getPropertyMetadata(NumberTest.prototype, 'num4');

    expect(data?.type).to.equal(ValueTypeName.Number);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.equal(undefined);
  });

  it('num5 should have correct metadata', () => {
    const data = getPropertyMetadata(NumberTest.prototype, 'num5');

    expect(data?.type).to.equal(ValueTypeName.Number);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.equal(undefined);
  });

  it('num6 should have correct metadata', () => {
    const data = getPropertyMetadata(NumberTest.prototype, 'num6');

    expect(data?.type).to.equal(ValueTypeName.Number);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.equal(1);
  });

  it('num7 should have correct metadata', () => {
    const data = getPropertyMetadata(NumberTest.prototype, 'num7');

    expect(data?.type).to.equal(ValueTypeName.Number);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.equal(0);
  });

  it('nums1 should have correct metadata', () => {
    const data = getPropertyMetadata(NumberTest.prototype, 'nums1');

    expect(data?.type).to.equal(ValueTypeName.Number);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.equal(undefined);
  });

  it('nums2 should have correct metadata', () => {
    const data = getPropertyMetadata(NumberTest.prototype, 'nums2');

    expect(data?.type).to.equal(ValueTypeName.Number);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.deep.equal([]);
  });

  it('nums3 should have correct metadata', () => {
    const data = getPropertyMetadata(NumberTest.prototype, 'nums3');

    expect(data?.type).to.equal(ValueTypeName.Number);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.deep.equal([1]);
  });

  it('nums4 should have correct metadata', () => {
    const data = getPropertyMetadata(NumberTest.prototype, 'nums4');

    expect(data?.type).to.equal(ValueTypeName.Number);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.equal(undefined);
  });

  it('nums5 should have correct metadata', () => {
    const data = getPropertyMetadata(NumberTest.prototype, 'nums5');

    expect(data?.type).to.equal(ValueTypeName.Number);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.equal(undefined);
  });

  it('nums6 should have correct metadata', () => {
    const data = getPropertyMetadata(NumberTest.prototype, 'nums6');

    expect(data?.type).to.equal(ValueTypeName.Number);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.deep.equal([]);
  });

  it('nums7 should have correct metadata', () => {
    const data = getPropertyMetadata(NumberTest.prototype, 'nums7');

    expect(data?.type).to.equal(ValueTypeName.Number);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.deep.equal([1]);
  });
});
