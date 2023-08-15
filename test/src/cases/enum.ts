import 'reflect-metadata';

export enum MyEnum {
  a = 'a',
  b = 'b',
}

export class EnumTest {
  myEnum1: MyEnum;

  myEnum2: MyEnum = MyEnum.a;

  myEnum3: MyEnum = MyEnum.b;

  myEnum4?: MyEnum;

  myEnum5?: MyEnum = undefined;

  myEnum6?: MyEnum = MyEnum.a;

  myEnum7?: MyEnum = MyEnum.b;

  myEnums1: MyEnum[];

  myEnums2: MyEnum[] = [];

  myEnums3: MyEnum[] = [MyEnum.a];

  myEnums4?: MyEnum[];

  myEnums5?: MyEnum[] = undefined;

  myEnums6?: MyEnum[] = [];

  myEnums7?: MyEnum[] = [MyEnum.b];
}
