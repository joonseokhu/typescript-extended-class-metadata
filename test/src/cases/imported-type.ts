import 'reflect-metadata';
import {
  IBoolean, IEnumA, IEnumB, INumber, IString, ISubA, ISubB,
} from './imported-type-data-1';
import { IEnumC, ISubC } from './imported-type-data-2';

export class ImportedTypeTest {
  iBool: IBoolean = true;

  iNum: INumber = 0;

  iStr: IString = '';

  iEnumA: IEnumA = IEnumA.a;

  iEnumB: IEnumB;

  iEnumC: IEnumC;

  iSubA: ISubA = new ISubA();

  iSubB: ISubB;

  iSubC: ISubC;
}
