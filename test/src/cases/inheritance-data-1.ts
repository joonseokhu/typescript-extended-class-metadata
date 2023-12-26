export class Animal {
  age: number = 0;

  eat() {
    return 'eat';
  }
}

export class Human extends Animal {
  name?: string;

  say() {
    return 'hello';
  }
}
