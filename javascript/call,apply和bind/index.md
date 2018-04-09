### 串联

```javascript
cat.call(dog,a,b) = cat.apply(dog,[a,b]) = (cat.bind(dog,a,b))() = dog.cat(a,b)
```

要理解 JS 当中的这三个关键字，首先得弄清楚它们用来干嘛。:

> 可以让 call()中的对象调用当前对象所拥有的 function。你可以使用 call()来实现继承:写一个方法，然后让另一个新的对象来继承它(而不是在新对象中再写一次这个方法)

简单来说，可以引用一句话：

> 为了动态改变某个函数运行时的上下文。

或

> 为了改变函数体内部 this 的指向

定义一个猫对象：

```javascript
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
```

这个猫对象拥有一个抓老鼠的技能 catchMouse()。

然后类似的，定义一个狗对象:

```javascript
class Dog {
  constructor(name) {
    this.name = name;
  }
  biteCriminal(name1,name2){
      console.log(`${this.name} bite 2 criminals! Their name are ${name1} and ${name2}`)
  }
}
```

这个狗对象可以咬坏人biteCriminal()。

接下来实例化两个对象，分别得到一只叫'Kitty'的猫和'Doggy'的狗：

```javascript

const kitty = new Cat('Kitty');
const doggy = new Dog('Doggy');

```

首先让他们发挥自己的技能：

```javascript

kitty.catchMouse('Mickey','Minnie');

// Kitty caught 2 mouse ! They called Mickey adn Minnie

doggy.biteCriminal('Tom','Jerry')

// Doggy bite 2 criminals! Their name are Tom and Jerry

```

现在，我们希望赋予Doggy抓老鼠的能力，如果不使用这三个关键字，应该怎么做？

plan A: 修改Dog对象，直接为其定义一个和Caat相同的抓老鼠技能。

plan B： 让Doggy吃掉Kitty，直接消化吸收Kitty的所有能力。

```javascript

class Dog {
  constructor (name, kitty) {
    this.name = name
    this.catchMouse = kitty.catchMouse
  }

  biteCriminals(name1, name2) {
    console.log(`${this.name} bite 2 criminals! Their name is ${name1} and ${name2}.`)
  }
}

const kitty = new Cat('Kitty')
const doggy = new Dog('Doggy', kitty)

doggy.catchMouse('Mickey', 'Minnie')
// Doggy caught 2 mouse! They call Mickey and Minnie.

```

有没有办法能够在不修改Dog对象的前提下，让Doggy实例也能狗拥有抓老鼠的办法呢？

```javascript


kitty.catchMouse.call(doggy,'Tom','Jerry');
kitty.catchMouse.apply(doggy,['Tom','Jerry']);
(kitty.catchMouse.bind(doggy,'Tom','Jerry'))();

```

