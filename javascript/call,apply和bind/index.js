class Cat {
  constructor(name) {
    this.name = name;
  }

  catchMouse(name1, name2) {
    console.log(
      `${this.name} caught 2 mouse : They called ${name1} and ${name2}`
    );
  }
}

class Dog {
  constructor(name) {
    this.name = name;
  }
  biteCriminal(name1, name2) {
    console.log(
      `${this.name} bite 2 criminals! Their name are ${name1} and ${name2}`
    );
  }
}


const kitty = new Cat('Kitty');
const doggy = new Dog('Doggy');

kitty.catchMouse.call(doggy,'Tom','Jerry');
kitty.catchMouse.apply(doggy,['Tom','Jerry']);
(kitty.catchMouse.bind(doggy,'Tom','Jerry'))();