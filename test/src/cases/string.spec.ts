import 'reflect-metadata';
import { expect } from 'chai';
import { getPropertyMetadata, getPropertyNames } from '../../../dist/lib';
import { StringTest } from './string';

describe('string', () => {
  it('should have correct property names', () => {
    expect(getPropertyNames(StringTest)).to.be.deep.equal([
      'str1',
      'str2',
      'str3',
      'str4',
      'str5',
      'str6',
      'str7',
      'strs1',
      'strs2',
      'strs3',
      'strs4',
      'strs5',
      'strs6',
      'strs7',
    ]);
  });

  it('str1 should have correct metadata', () => {
    const data = getPropertyMetadata(StringTest.prototype, 'str1');

    expect(data?.type).to.equal(String);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.equal(undefined);
  });

  it('str2 should have correct metadata', () => {
    const data = getPropertyMetadata(StringTest.prototype, 'str2');

    expect(data?.type).to.equal(String);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.equal('my-string-1');
  });

  it('str3 should have correct metadata', () => {
    const data = getPropertyMetadata(StringTest.prototype, 'str3');

    expect(data?.type).to.equal(String);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.equal('');
  });

  it('str4 should have correct metadata', () => {
    const data = getPropertyMetadata(StringTest.prototype, 'str4');

    expect(data?.type).to.equal(String);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.equal(undefined);
  });

  it('str5 should have correct metadata', () => {
    const data = getPropertyMetadata(StringTest.prototype, 'str5');

    expect(data?.type).to.equal(String);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.equal(undefined);
  });

  it('str6 should have correct metadata', () => {
    const data = getPropertyMetadata(StringTest.prototype, 'str6');

    expect(data?.type).to.equal(String);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.equal('my-string-2');
  });

  it('str7 should have correct metadata', () => {
    const data = getPropertyMetadata(StringTest.prototype, 'str7');

    expect(data?.type).to.equal(String);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.equal('');
  });

  it('strs1 should have correct metadata', () => {
    const data = getPropertyMetadata(StringTest.prototype, 'strs1');

    expect(data?.type).to.equal(String);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.equal(undefined);
  });

  it('strs2 should have correct metadata', () => {
    const data = getPropertyMetadata(StringTest.prototype, 'strs2');

    expect(data?.type).to.equal(String);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.deep.equal([]);
  });

  it('strs3 should have correct metadata', () => {
    const data = getPropertyMetadata(StringTest.prototype, 'strs3');

    expect(data?.type).to.equal(String);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.deep.equal(['my-string-1']);
  });

  it('strs4 should have correct metadata', () => {
    const data = getPropertyMetadata(StringTest.prototype, 'strs4');

    expect(data?.type).to.equal(String);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.equal(undefined);
  });

  it('strs5 should have correct metadata', () => {
    const data = getPropertyMetadata(StringTest.prototype, 'strs5');

    expect(data?.type).to.equal(String);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.equal(undefined);
  });

  it('strs6 should have correct metadata', () => {
    const data = getPropertyMetadata(StringTest.prototype, 'strs6');

    expect(data?.type).to.equal(String);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.deep.equal([]);
  });

  it('strs7 should have correct metadata', () => {
    const data = getPropertyMetadata(StringTest.prototype, 'strs7');

    expect(data?.type).to.equal(String);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.deep.equal(['my-string-1']);
  });
});
