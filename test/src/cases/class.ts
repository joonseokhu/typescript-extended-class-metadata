import 'reflect-metadata';

export class Foo {
  value: string;
}

export class Bar<T = number> {
  value: T;
}

const foo1 = new Foo();
foo1.value = 'sub1-value';

const foo2 = new Foo();
foo2.value = 'sub2-value';

const bar1 = new Bar();
bar1.value = 1;

const bar2 = new Bar<number>();
bar2.value = 2;

export {
  foo1, foo2, bar1, bar2,
};

export class ClassTest {
  foo1: Foo;

  foo2: Foo = foo1;

  foo3: Foo = foo2;

  foo4: Foo = new Foo();

  foo5?: Foo;

  foo6?: Foo = undefined;

  foo7?: Foo = foo1;

  foo8?: Foo = foo2;

  foos1: Foo[];

  foos2: Foo[] = [];

  foos3: Foo[] = [foo1];

  foos4: Foo[] = [new Foo()];

  foos5?: Foo[];

  foos6?: Foo[] = undefined;

  foos7?: Foo[] = [];

  foos8?: Foo[] = [foo2];

  bar1: Bar;

  bar2: Bar = bar1;

  bar3: Bar = bar2;

  bar4: Bar = new Bar();

  bar5?: Bar;

  bar6?: Bar = undefined;

  bar7?: Bar = bar1;

  bar8?: Bar = bar2;

  bars1: Bar[];

  bars2: Bar[] = [];

  bars3: Bar[] = [bar1];

  bars4: Bar[] = [new Bar()];

  bars5?: Bar[];

  bars6?: Bar[] = undefined;

  bars7?: Bar[] = [];

  bars8?: Bar[] = [bar2];
}
