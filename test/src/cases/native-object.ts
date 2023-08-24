import 'reflect-metadata';

export class NativeObjectTest {
  date1: Date;

  date2: Date = new Date();

  date3?: Date;

  date4: Date[];

  regex1: RegExp;

  regex2: RegExp = /abc/;

  regex3?: RegExp;

  regex4: RegExp[];

  set1: Set<string>;

  set2: Set<number> = new Set<number>();

  set3?: Set<boolean>;

  set4: Set<Date>[];
}
