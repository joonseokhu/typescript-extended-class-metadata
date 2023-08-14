import 'reflect-metadata';
import { expect } from 'chai';
import { getPropertyMetadata, getPropertyNames } from '../../../dist/lib';
import { BooleanTest } from './boolean';

describe('boolean', () => {
  it('should have correct property names', () => {
    expect(getPropertyNames(BooleanTest)).to.be.deep.equal([
      'bool1',
      'bool2',
      'bool3',
      'bool4',
      'bool5',
      'bool6',
      'bool7',
      'bools1',
      'bools2',
      'bools3',
      'bools4',
      'bools5',
      'bools6',
      'bools7',
    ]);
  });

  it('bool1 should have correct metadata', () => {
    const data = getPropertyMetadata(BooleanTest.prototype, 'bool1');

    expect(data?.type).to.equal(Boolean);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.equal(undefined);
  });

  it('bool2 should have correct metadata', () => {
    const data = getPropertyMetadata(BooleanTest.prototype, 'bool2');

    expect(data?.type).to.equal(Boolean);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.equal(true);
  });

  it('bool3 should have correct metadata', () => {
    const data = getPropertyMetadata(BooleanTest.prototype, 'bool3');

    expect(data?.type).to.equal(Boolean);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.equal(false);
  });

  it('bool4 should have correct metadata', () => {
    const data = getPropertyMetadata(BooleanTest.prototype, 'bool4');

    expect(data?.type).to.equal(Boolean);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.equal(undefined);
  });

  it('bool5 should have correct metadata', () => {
    const data = getPropertyMetadata(BooleanTest.prototype, 'bool5');

    expect(data?.type).to.equal(Boolean);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.equal(undefined);
  });

  it('bool6 should have correct metadata', () => {
    const data = getPropertyMetadata(BooleanTest.prototype, 'bool6');

    expect(data?.type).to.equal(Boolean);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.equal(true);
  });

  it('bool7 should have correct metadata', () => {
    const data = getPropertyMetadata(BooleanTest.prototype, 'bool7');

    expect(data?.type).to.equal(Boolean);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.equal(false);
  });

  it('bools1 should have correct metadata', () => {
    const data = getPropertyMetadata(BooleanTest.prototype, 'bools1');

    expect(data?.type).to.equal(Boolean);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.equal(undefined);
  });

  it('bools2 should have correct metadata', () => {
    const data = getPropertyMetadata(BooleanTest.prototype, 'bools2');

    expect(data?.type).to.equal(Boolean);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.deep.equal([]);
  });

  it('bools3 should have correct metadata', () => {
    const data = getPropertyMetadata(BooleanTest.prototype, 'bools3');

    expect(data?.type).to.equal(Boolean);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.deep.equal([true]);
  });

  it('bools4 should have correct metadata', () => {
    const data = getPropertyMetadata(BooleanTest.prototype, 'bools4');

    expect(data?.type).to.equal(Boolean);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.equal(undefined);
  });

  it('bools5 should have correct metadata', () => {
    const data = getPropertyMetadata(BooleanTest.prototype, 'bools5');

    expect(data?.type).to.equal(Boolean);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.equal(undefined);
  });

  it('bools6 should have correct metadata', () => {
    const data = getPropertyMetadata(BooleanTest.prototype, 'bools6');

    expect(data?.type).to.equal(Boolean);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.deep.equal([]);
  });

  it('bools7 should have correct metadata', () => {
    const data = getPropertyMetadata(BooleanTest.prototype, 'bools7');

    expect(data?.type).to.equal(Boolean);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.deep.equal([true]);
  });
});
