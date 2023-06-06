import 'reflect-metadata'

enum MyEnum {
  a = 'my-a',
  b = 'my-b',
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

  uniStr1: 'a' | 'b';
  uniStr2?: 'a' | 'b';
  uniStrs1: ('a' | 'b')[];
  uniStrs2?: ('a' | 'b')[];
  
  uniNum1: 1 | 2;
  uniNum2?: 1 | 2;
  uniNums1: (1 | 2)[];
  uniNums2?: (1 | 2)[];

  obj1: {};
  obj2?: {};
  objs1: {}[];
  objs2?: {}[];
}

export class Bar {
  num1: number;
}

@Reflect.metadata('a', '1')
export class Baz {
  foo1: Foo;
  foo2?: Foo;
  @Reflect.metadata('a', '1')
  foos1: Foo[] = [];
  foos2?: Foo[];

  fooBar1: Foo | Bar;
  fooBar2?: Foo | Bar;
  fooBars1: (Foo | Bar)[];
  fooBars2?: (Foo | Bar)[] = [];
}
