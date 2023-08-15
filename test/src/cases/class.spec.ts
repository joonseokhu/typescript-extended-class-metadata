import 'reflect-metadata';
import { expect } from 'chai';
import { getPropertyMetadata, getPropertyNames, ValueTypeName } from '../../../dist/lib';
import {
  ClassTest, Sub, sub1, sub2,
} from './class';

describe('class', () => {
  it('should have correct property names', () => {
    expect(getPropertyNames(ClassTest)).to.be.deep.equal([
      'sub1',
      'sub2',
      'sub3',
      'sub4',
      'sub5',
      'sub6',
      'sub7',
      'subs1',
      'subs2',
      'subs3',
      'subs4',
      'subs5',
      'subs6',
      'subs7',
    ]);
  });

  it('sub1 should have correct metadata', () => {
    const data = getPropertyMetadata(ClassTest.prototype, 'sub1');

    expect(data?.type).to.equal(ValueTypeName.Class);
    expect(data?.class).to.equal(Sub);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.equal(undefined);
    expect(data?.isClass).to.equal(true);
  });

  it('sub2 should have correct metadata', () => {
    const data = getPropertyMetadata(ClassTest.prototype, 'sub2');

    expect(data?.type).to.equal(ValueTypeName.Class);
    expect(data?.class).to.equal(Sub);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.deep.equal(sub1);
    expect(data?.isClass).to.equal(true);
  });

  it('sub3 should have correct metadata', () => {
    const data = getPropertyMetadata(ClassTest.prototype, 'sub3');

    expect(data?.type).to.equal(ValueTypeName.Class);
    expect(data?.class).to.equal(Sub);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.deep.equal(sub2);
    expect(data?.isClass).to.equal(true);
  });

  it('sub4 should have correct metadata', () => {
    const data = getPropertyMetadata(ClassTest.prototype, 'sub4');

    expect(data?.type).to.equal(ValueTypeName.Class);
    expect(data?.class).to.equal(Sub);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.equal(undefined);
    expect(data?.isClass).to.equal(true);
  });

  it('sub5 should have correct metadata', () => {
    const data = getPropertyMetadata(ClassTest.prototype, 'sub5');

    expect(data?.type).to.equal(ValueTypeName.Class);
    expect(data?.class).to.equal(Sub);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.equal(undefined);
    expect(data?.isClass).to.equal(true);
  });

  it('sub6 should have correct metadata', () => {
    const data = getPropertyMetadata(ClassTest.prototype, 'sub6');

    expect(data?.type).to.equal(ValueTypeName.Class);
    expect(data?.class).to.equal(Sub);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.deep.equal(sub1);
    expect(data?.isClass).to.equal(true);
  });

  it('sub7 should have correct metadata', () => {
    const data = getPropertyMetadata(ClassTest.prototype, 'sub7');

    expect(data?.type).to.equal(ValueTypeName.Class);
    expect(data?.class).to.equal(Sub);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.deep.equal(sub2);
    expect(data?.isClass).to.equal(true);
  });

  it('subs1 should have correct metadata', () => {
    const data = getPropertyMetadata(ClassTest.prototype, 'subs1');

    expect(data?.type).to.equal(ValueTypeName.Class);
    expect(data?.class).to.equal(Sub);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.equal(undefined);
    expect(data?.isClass).to.equal(true);
  });

  it('subs2 should have correct metadata', () => {
    const data = getPropertyMetadata(ClassTest.prototype, 'subs2');

    expect(data?.type).to.equal(ValueTypeName.Class);
    expect(data?.class).to.equal(Sub);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.deep.equal([]);
    expect(data?.isClass).to.equal(true);
  });

  it('subs3 should have correct metadata', () => {
    const data = getPropertyMetadata(ClassTest.prototype, 'subs3');

    expect(data?.type).to.equal(ValueTypeName.Class);
    expect(data?.class).to.equal(Sub);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.deep.equal([sub1]);
    expect(data?.isClass).to.equal(true);
  });

  it('subs4 should have correct metadata', () => {
    const data = getPropertyMetadata(ClassTest.prototype, 'subs4');

    expect(data?.type).to.equal(ValueTypeName.Class);
    expect(data?.class).to.equal(Sub);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.equal(undefined);
    expect(data?.isClass).to.equal(true);
  });

  it('subs5 should have correct metadata', () => {
    const data = getPropertyMetadata(ClassTest.prototype, 'subs5');

    expect(data?.type).to.equal(ValueTypeName.Class);
    expect(data?.class).to.equal(Sub);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.equal(undefined);
    expect(data?.isClass).to.equal(true);
  });

  it('subs6 should have correct metadata', () => {
    const data = getPropertyMetadata(ClassTest.prototype, 'subs6');

    expect(data?.type).to.equal(ValueTypeName.Class);
    expect(data?.class).to.equal(Sub);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.deep.equal([]);
    expect(data?.isClass).to.equal(true);
  });

  it('subs7 should have correct metadata', () => {
    const data = getPropertyMetadata(ClassTest.prototype, 'subs7');

    expect(data?.type).to.equal(ValueTypeName.Class);
    expect(data?.class).to.equal(Sub);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.deep.equal([sub2]);
    expect(data?.isClass).to.equal(true);
  });
});
