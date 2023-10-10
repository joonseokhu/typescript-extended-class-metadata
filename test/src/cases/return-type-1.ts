import 'reflect-metadata';

export enum MyEnum {
  a = 'a',
}

export class Sub {}

export class ReturnTypeTest1 {
  method1() {
    return undefined;
  }

  method2() {
    return null;
  }

  method3() {
    return false;
  }

  method4() {
    return false;
  }

  method5() {
    return 0;
  }

  method6() {
    return -42;
  }

  method7() {
    return '';
  }

  method8() {
    return 'str\ning';
  }

  method9() {
    return MyEnum.a;
  }

  method10() {
    return new Date();
  }

  method11() {
    return new Sub();
  }

  method12() {
    return () => {};
  }
}
