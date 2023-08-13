import 'reflect-metadata';
import * as constants from '../../dist/common/constants';
import { ClassPropertyMetadata, getPropertyMetadata, getPropertyNames } from '../../dist/lib';

type UseRichMetaCallback = (
  prop: ClassPropertyMetadata,
  target: any,
  applyDecorators: (...decorators: PropertyDecorator[]) => void
) => any;

const UseRichMeta = (callback: UseRichMetaCallback): ClassDecorator => (target) => {
  const propsNames = getPropertyNames(target);
  propsNames.forEach((propName) => {
    const metadata = getPropertyMetadata(target.prototype, propName);
    if (!metadata) throw new Error('metadata is undefined');
    const applyDecorators = (...decorators: PropertyDecorator[]) => {
      decorators.forEach((decorator) => {
        decorator(target.prototype, propName);
      });
    };
    callback(metadata, target, applyDecorators);
  });
};

const IsNumber = (): PropertyDecorator => (target, propertyKey) => {
  // console.log('@IsNumber', propertyKey, getPropertyMetadata(target, propertyKey));
};

const IsOptional = (): PropertyDecorator => (target, propertyKey) => {
  // console.log('@IsOptional', propertyKey);
};

enum MyEnum {
  a = 'my-a',
  b = 'my-b',
}

interface IFoo {
  num1: number;
}

@UseRichMeta((prop, target, applyDecorators) => {
  if (prop.type === Number) {
    applyDecorators(IsNumber());
  }
  if (prop.isOptional) {
    applyDecorators(IsOptional());
  }
})
export class Foo implements IFoo {
  /* single line multi comment 1 */
  num1: number;

  /** single line multi comment 2 */
  num2?: number;

  // single line comment
  nums1: number[];

  /**
   * hjkh  jhk hbui
   * dsa
   * @description abdd sssd eewwd
   * @description 22222
   * fsda
   * sadfasfasdfas ddds
   * @deprecated - dasfasdfasd sdfasdasdf
   * multi line comment
   * abcd efg
   * ads sadofasdnsowmo werwer
   */
  nums2?: number[];

  bool1: boolean;

  bool2?: boolean;

  bools1: boolean[] = [];

  bools2?: boolean[];

  str1: string = 'my-string-1';

  str2?: string;

  strs1: string[];

  strs2?: string[];

  myEnum1: MyEnum;

  myEnum2?: MyEnum;

  myEnums1: MyEnum[] = [MyEnum.a];

  myEnums2?: MyEnum[];

  obj1: {};

  obj2?: {};

  objs1: {}[];

  objs2?: {}[];
}

export class Bar {
  num1: number;
}

export class Baz extends Foo {
  foo1: Foo;

  foo2?: Foo;

  foos1: Foo[] = [];

  foos2?: Foo[];
}

export class UnionTest {
  uniStr1: 'a' | 'b';

  uniStr2?: 'a' | 'b';

  uniStrs1: ('a' | 'b')[];

  uniStrs2?: ('a' | 'b')[];

  uniNum1: 1 | 2;

  uniNum2?: 1 | 2;

  uniNums1: (1 | 2)[];

  uniNums2?: (1 | 2)[];

  fooBar1: Foo | Bar;

  fooBar2?: Foo | Bar;

  fooBars1: (Foo | Bar)[];

  fooBars2?: (Foo | Bar)[] = [];
}

const FooType = (name: string) => {
  class FooMixin {}
  return FooMixin;
};

export class MethodTest extends FooType('hi') {
  getFoo1(): Foo {
    return new Foo();
  }

  getFoo2(): Foo | undefined {
    return new Foo();
  }

  getFoo3(): Promise<Foo> {
    return Promise.resolve(new Foo());
  }

  getFoo4(): Promise<Foo | undefined> {
    return Promise.resolve(new Foo());
  }

  async getFoo5() {
    return new Foo();
  }

  async getFoo6(): Promise<Foo> {
    return new Foo();
  }
}

(() => {
  const baz = new Baz();
  baz.num1 = 123;
  baz.nums1 = [234];
  baz.bool1 = true;
  baz.bool2 = false;
  baz.str1 = 'asdfsdafasdf';
  baz.strs1 = ['sadfasdf'];
  baz.myEnum1 = MyEnum.a;
  baz.myEnums1 = [MyEnum.b];
  baz.obj1 = {};
  baz.objs1 = [];
  baz.foo1 = new Foo();

  const propsMeta = getPropertyNames(Baz);
  const propMetaKeys = Reflect.getMetadataKeys(Baz.prototype, 'num1');
  const propMeta = getPropertyMetadata(Baz.prototype, 'num1');
  // console.log(constants.StaticKey.props)
  console.log('propsMeta', propsMeta);
  // console.log('propMetaKeys', propMetaKeys);
  // console.log('propMeta', propMeta);
})();
