import { Animal, Human } from './inheritance-data-1';

export class Dog extends Animal {
  tail?: string;

  bark() {
    return 'bark';
  }
}

export class Doctor extends Human {
  majors: string[] = [];

  heal() {
    return 'heal';
  }
}

export class ENTDoctor extends Doctor {
  majors: string[] = ['ENT'];

  entExperience: number = 0;

  heal() {
    return 'heal ENT';
  }
}
