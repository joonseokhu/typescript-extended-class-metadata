import 'reflect-metadata';
import { expect } from 'chai';
import { getPropertyMetadata, getPropertyNames, ValueTypeName } from '../../../dist/lib';
import {
  Bar,
  bar1,
  bar2,
  ClassTest, Foo, foo1, foo2,
} from './class';

describe('class', () => {
  it('should have correct property names', () => {
    expect(getPropertyNames(ClassTest)).to.be.deep.equal([
      'foo1',
      'foo2',
      'foo3',
      'foo4',
      'foo5',
      'foo6',
      'foo7',
      'foo8',
      'foos1',
      'foos2',
      'foos3',
      'foos4',
      'foos5',
      'foos6',
      'foos7',
      'foos8',
      'bar1',
      'bar2',
      'bar3',
      'bar4',
      'bar5',
      'bar6',
      'bar7',
      'bar8',
      'bars1',
      'bars2',
      'bars3',
      'bars4',
      'bars5',
      'bars6',
      'bars7',
      'bars8',
    ]);
  });

  it('foo1 should have correct metadata', () => {
    const data = getPropertyMetadata(ClassTest.prototype, 'foo1');

    expect(data?.type).to.equal(ValueTypeName.Object);
    expect(data?.class).to.equal(Foo);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.equal(undefined);
    expect(data?.isClass).to.equal(true);
  });

  it('foo2 should have correct metadata', () => {
    const data = getPropertyMetadata(ClassTest.prototype, 'foo2');

    expect(data?.type).to.equal(ValueTypeName.Object);
    expect(data?.class).to.equal(Foo);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.deep.equal(foo1);
    expect(data?.isClass).to.equal(true);
  });

  it('foo3 should have correct metadata', () => {
    const data = getPropertyMetadata(ClassTest.prototype, 'foo3');

    expect(data?.type).to.equal(ValueTypeName.Object);
    expect(data?.class).to.equal(Foo);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.deep.equal(foo2);
    expect(data?.isClass).to.equal(true);
  });

  it('foo4 should have correct metadata', () => {
    const data = getPropertyMetadata(ClassTest.prototype, 'foo4');

    expect(data?.type).to.equal(ValueTypeName.Object);
    expect(data?.class).to.equal(Foo);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.instanceOf(Foo);
    expect(data?.isClass).to.equal(true);
  });

  it('foo5 should have correct metadata', () => {
    const data = getPropertyMetadata(ClassTest.prototype, 'foo5');

    expect(data?.type).to.equal(ValueTypeName.Object);
    expect(data?.class).to.equal(Foo);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.equal(undefined);
    expect(data?.isClass).to.equal(true);
  });

  it('foo6 should have correct metadata', () => {
    const data = getPropertyMetadata(ClassTest.prototype, 'foo6');

    expect(data?.type).to.equal(ValueTypeName.Object);
    expect(data?.class).to.equal(Foo);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.equal(undefined);
    expect(data?.isClass).to.equal(true);
  });

  it('foo7 should have correct metadata', () => {
    const data = getPropertyMetadata(ClassTest.prototype, 'foo7');

    expect(data?.type).to.equal(ValueTypeName.Object);
    expect(data?.class).to.equal(Foo);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.deep.equal(foo1);
    expect(data?.isClass).to.equal(true);
  });

  it('foo8 should have correct metadata', () => {
    const data = getPropertyMetadata(ClassTest.prototype, 'foo8');

    expect(data?.type).to.equal(ValueTypeName.Object);
    expect(data?.class).to.equal(Foo);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.deep.equal(foo2);
    expect(data?.isClass).to.equal(true);
  });

  it('foos1 should have correct metadata', () => {
    const data = getPropertyMetadata(ClassTest.prototype, 'foos1');

    expect(data?.type).to.equal(ValueTypeName.Object);
    expect(data?.class).to.equal(Foo);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.equal(undefined);
    expect(data?.isClass).to.equal(true);
  });

  it('foos2 should have correct metadata', () => {
    const data = getPropertyMetadata(ClassTest.prototype, 'foos2');

    expect(data?.type).to.equal(ValueTypeName.Object);
    expect(data?.class).to.equal(Foo);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.deep.equal([]);
    expect(data?.isClass).to.equal(true);
  });

  it('foos3 should have correct metadata', () => {
    const data = getPropertyMetadata(ClassTest.prototype, 'foos3');

    expect(data?.type).to.equal(ValueTypeName.Object);
    expect(data?.class).to.equal(Foo);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.deep.equal([foo1]);
    expect(data?.isClass).to.equal(true);
  });

  it('foos4 should have correct metadata', () => {
    const data = getPropertyMetadata(ClassTest.prototype, 'foos4');

    expect(data?.type).to.equal(ValueTypeName.Object);
    expect(data?.class).to.equal(Foo);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer[0]).to.instanceOf(Foo);
    expect(data?.isClass).to.equal(true);
  });

  it('foos5 should have correct metadata', () => {
    const data = getPropertyMetadata(ClassTest.prototype, 'foos5');

    expect(data?.type).to.equal(ValueTypeName.Object);
    expect(data?.class).to.equal(Foo);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.equal(undefined);
    expect(data?.isClass).to.equal(true);
  });

  it('foos6 should have correct metadata', () => {
    const data = getPropertyMetadata(ClassTest.prototype, 'foos6');

    expect(data?.type).to.equal(ValueTypeName.Object);
    expect(data?.class).to.equal(Foo);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.equal(undefined);
    expect(data?.isClass).to.equal(true);
  });

  it('foos7 should have correct metadata', () => {
    const data = getPropertyMetadata(ClassTest.prototype, 'foos7');

    expect(data?.type).to.equal(ValueTypeName.Object);
    expect(data?.class).to.equal(Foo);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.deep.equal([]);
    expect(data?.isClass).to.equal(true);
  });

  it('foos8 should have correct metadata', () => {
    const data = getPropertyMetadata(ClassTest.prototype, 'foos8');

    expect(data?.type).to.equal(ValueTypeName.Object);
    expect(data?.class).to.equal(Foo);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.deep.equal([foo2]);
    expect(data?.isClass).to.equal(true);
  });

  it('bar1 should have correct metadata', () => {
    const data = getPropertyMetadata(ClassTest.prototype, 'bar1');

    expect(data?.type).to.equal(ValueTypeName.Object);
    expect(data?.class).to.equal(Bar);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.equal(undefined);
    expect(data?.isClass).to.equal(true);
  });

  it('bar2 should have correct metadata', () => {
    const data = getPropertyMetadata(ClassTest.prototype, 'bar2');

    expect(data?.type).to.equal(ValueTypeName.Object);
    expect(data?.class).to.equal(Bar);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.deep.equal(bar1);
    expect(data?.isClass).to.equal(true);
  });

  it('bar3 should have correct metadata', () => {
    const data = getPropertyMetadata(ClassTest.prototype, 'bar3');

    expect(data?.type).to.equal(ValueTypeName.Object);
    expect(data?.class).to.equal(Bar);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.deep.equal(bar2);
    expect(data?.isClass).to.equal(true);
  });

  it('bar4 should have correct metadata', () => {
    const data = getPropertyMetadata(ClassTest.prototype, 'bar4');

    expect(data?.type).to.equal(ValueTypeName.Object);
    expect(data?.class).to.equal(Bar);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.instanceOf(Bar);
    expect(data?.isClass).to.equal(true);
  });

  it('bar5 should have correct metadata', () => {
    const data = getPropertyMetadata(ClassTest.prototype, 'bar5');

    expect(data?.type).to.equal(ValueTypeName.Object);
    expect(data?.class).to.equal(Bar);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.equal(undefined);
    expect(data?.isClass).to.equal(true);
  });

  it('bar6 should have correct metadata', () => {
    const data = getPropertyMetadata(ClassTest.prototype, 'bar6');

    expect(data?.type).to.equal(ValueTypeName.Object);
    expect(data?.class).to.equal(Bar);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.equal(undefined);
    expect(data?.isClass).to.equal(true);
  });

  it('bar7 should have correct metadata', () => {
    const data = getPropertyMetadata(ClassTest.prototype, 'bar7');

    expect(data?.type).to.equal(ValueTypeName.Object);
    expect(data?.class).to.equal(Bar);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.deep.equal(bar1);
    expect(data?.isClass).to.equal(true);
  });

  it('bar8 should have correct metadata', () => {
    const data = getPropertyMetadata(ClassTest.prototype, 'bar8');

    expect(data?.type).to.equal(ValueTypeName.Object);
    expect(data?.class).to.equal(Bar);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.deep.equal(bar2);
    expect(data?.isClass).to.equal(true);
  });

  it('bars1 should have correct metadata', () => {
    const data = getPropertyMetadata(ClassTest.prototype, 'bars1');

    expect(data?.type).to.equal(ValueTypeName.Object);
    expect(data?.class).to.equal(Bar);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.equal(undefined);
    expect(data?.isClass).to.equal(true);
  });

  it('bars2 should have correct metadata', () => {
    const data = getPropertyMetadata(ClassTest.prototype, 'bars2');

    expect(data?.type).to.equal(ValueTypeName.Object);
    expect(data?.class).to.equal(Bar);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.deep.equal([]);
    expect(data?.isClass).to.equal(true);
  });

  it('bars3 should have correct metadata', () => {
    const data = getPropertyMetadata(ClassTest.prototype, 'bars3');

    expect(data?.type).to.equal(ValueTypeName.Object);
    expect(data?.class).to.equal(Bar);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.deep.equal([bar1]);
    expect(data?.isClass).to.equal(true);
  });

  it('bars4 should have correct metadata', () => {
    const data = getPropertyMetadata(ClassTest.prototype, 'bars4');

    expect(data?.type).to.equal(ValueTypeName.Object);
    expect(data?.class).to.equal(Bar);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer[0]).to.instanceOf(Bar);
    expect(data?.isClass).to.equal(true);
  });

  it('bars5 should have correct metadata', () => {
    const data = getPropertyMetadata(ClassTest.prototype, 'bars5');

    expect(data?.type).to.equal(ValueTypeName.Object);
    expect(data?.class).to.equal(Bar);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.equal(undefined);
    expect(data?.isClass).to.equal(true);
  });

  it('bars6 should have correct metadata', () => {
    const data = getPropertyMetadata(ClassTest.prototype, 'bars6');

    expect(data?.type).to.equal(ValueTypeName.Object);
    expect(data?.class).to.equal(Bar);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.equal(undefined);
    expect(data?.isClass).to.equal(true);
  });

  it('bars7 should have correct metadata', () => {
    const data = getPropertyMetadata(ClassTest.prototype, 'bars7');

    expect(data?.type).to.equal(ValueTypeName.Object);
    expect(data?.class).to.equal(Bar);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.deep.equal([]);
    expect(data?.isClass).to.equal(true);
  });

  it('bars8 should have correct metadata', () => {
    const data = getPropertyMetadata(ClassTest.prototype, 'bars8');

    expect(data?.type).to.equal(ValueTypeName.Object);
    expect(data?.class).to.equal(Bar);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.deep.equal([bar2]);
    expect(data?.isClass).to.equal(true);
  });
});
