import 'reflect-metadata';
import { expect } from 'chai';
import {
  ValueTypeName, getPropertyMetadata, getPropertyNames, getMethodNames, getMethodMetadata,
  getMethodParamTypesMetadata,
  getMethodReturnTypeMetadata,
} from '../../../dist/lib';
import { Dog, Doctor, ENTDoctor } from './inheritance';

describe('inheritance', () => {
  it('should have correct property names', () => {
    expect(getPropertyNames(Dog)).to.be.deep.equal([
      'age',
      'tail',
    ]);

    expect(getMethodNames(Dog)).to.be.deep.equal([
      'eat',
      'bark',
    ]);

    expect(getPropertyNames(Doctor)).to.be.deep.equal([
      'age',
      'name',
      'majors',
    ]);

    expect(getMethodNames(Doctor)).to.be.deep.equal([
      'eat',
      'say',
      'heal',
    ]);

    expect(getPropertyNames(ENTDoctor)).to.be.deep.equal([
      'age',
      'name',
      'majors',
      'entExperience',
    ]);
  });

  it('Dog.age should have correct metadata', () => {
    const data = getPropertyMetadata(Dog.prototype, 'age');

    expect(data?.type).to.equal(ValueTypeName.Number);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.equal(0);
  });

  it('Dog.eat should have correct metadata', () => {
    const data = getMethodReturnTypeMetadata(Dog.prototype, 'eat');

    expect(data?.type).to.equal(ValueTypeName.String);
  });

  it('Dog.tail should have correct metadata', () => {
    const data = getPropertyMetadata(Dog.prototype, 'tail');

    expect(data?.type).to.equal(ValueTypeName.String);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.equal(undefined);
  });

  it('Doctor.age should have correct metadata', () => {
    const data = getPropertyMetadata(Doctor.prototype, 'age');

    expect(data?.type).to.equal(ValueTypeName.Number);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.equal(0);
  });

  it('Doctor.name should have correct metadata', () => {
    const data = getPropertyMetadata(Doctor.prototype, 'name');

    expect(data?.type).to.equal(ValueTypeName.String);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(true);
    expect(data?.initializer).to.equal(undefined);
  });

  it('Doctor.majors should have correct metadata', () => {
    const data = getPropertyMetadata(Doctor.prototype, 'majors');

    expect(data?.type).to.equal(ValueTypeName.String);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.deep.equal([]);
  });

  it('ENTDoctor.age should have correct metadata', () => {
    const data = getPropertyMetadata(ENTDoctor.prototype, 'age');

    expect(data?.type).to.equal(ValueTypeName.Number);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.deep.equal(0);
  });

  it('ENTDoctor.majors should have correct metadata', () => {
    const data = getPropertyMetadata(ENTDoctor.prototype, 'majors');

    expect(data?.type).to.equal(ValueTypeName.String);
    expect(data?.isArray).to.equal(true);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.deep.equal(['ENT']);
  });

  it('ENTDoctor.entExperience should have correct metadata', () => {
    const data = getPropertyMetadata(ENTDoctor.prototype, 'entExperience');

    expect(data?.type).to.equal(ValueTypeName.Number);
    expect(data?.isArray).to.equal(false);
    expect(data?.isOptional).to.equal(false);
    expect(data?.initializer).to.deep.equal(0);
  });
});
