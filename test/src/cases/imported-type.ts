import 'reflect-metadata';
import {
  IBoolean, IEnum, INumber, IString, ISub,
} from './imported-type-data';

export class ImportedTypeTest {
  iBool: IBoolean = true;

  iNum: INumber = 0;

  iStr: IString = '';

  iEnum: IEnum = IEnum.a;

  iSub: ISub = new ISub();
}
