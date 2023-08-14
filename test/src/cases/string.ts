import 'reflect-metadata';

export class StringTest {
  str1: string;

  str2: string = 'my-string-1';

  str3: string = '';

  str4?: string;

  str5?: string = undefined;

  str6?: string = 'my-string-2';

  str7?: string = '';

  strs1: string[];

  strs2: string[] = [];

  strs3: string[] = ['my-string-1'];

  strs4?: string[];

  strs5?: string[] = undefined;

  strs6?: string[] = [];

  strs7?: string[] = ['my-string-1'];
}
