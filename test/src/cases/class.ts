import 'reflect-metadata';

export class Sub {
  value: string;
}

const sub1 = new Sub();
sub1.value = 'sub1-value';

const sub2 = new Sub();
sub2.value = 'sub2-value';

export { sub1, sub2 };

export class ClassTest {
  sub1: Sub;

  sub2: Sub = sub1;

  sub3: Sub = sub2;

  sub4?: Sub;

  sub5?: Sub = undefined;

  sub6?: Sub = sub1;

  sub7?: Sub = sub2;

  subs1: Sub[];

  subs2: Sub[] = [];

  subs3: Sub[] = [sub1];

  subs4?: Sub[];

  subs5?: Sub[] = undefined;

  subs6?: Sub[] = [];

  subs7?: Sub[] = [sub2];
}
