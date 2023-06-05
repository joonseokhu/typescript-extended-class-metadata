import 'reflect-metadata'

enum MyEnum {
  a = 'my-a',
  b = 'my-b',
}

enum YourEnum {
  a = 'my-a',
  b = 'my-b',
}

const MyMeta = (value: string): ClassDecorator => {
  return (target) => {
    Reflect.defineMetadata('custom', value, target.prototype);
  }
}

@Reflect.metadata('a', '1')
@Reflect.metadata('a', '2')
export class Foo {
  num1: number;
  num2?: number;
  nums1: number[];
  nums2?: number[];

  bool1: boolean;
  bool2?: boolean;
  bools1: boolean[] = [];
  bools2?: boolean[];

  str1: string;
  str2?: string;
  strs1: string[];
  strs2?: string[];

  myEnum1: MyEnum;
  myEnum2?: MyEnum;
  myEnums1: MyEnum[] = [MyEnum.a];
  myEnums2?: MyEnum[];
  
  yourEnum1: YourEnum;
  yourEnum2?: YourEnum;
}

@Reflect.metadata('a', '1')
export class Bar {
  foo1: Foo;
  foo2?: Foo;
  @Reflect.metadata('a', '1')
  foos1: Foo[] = [];
  foos2?: Foo[];

  bar: {};
}
