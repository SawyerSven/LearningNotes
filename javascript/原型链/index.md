
我们有一个对象:

```javascript

var obj = {name:'obj}

```

当我们读取obj.toString时，JS引擎会做下面的事情：

1. 看Ojb对象本身有没有toString属性。

2. 看obj.\__proto\__对象有没有toString属性，发现obj.\__proto\__有toString属性，于是找到了

所以 obj.toString实际上就是第2步中找到的obj.\__proto\__.toString。

3. 如果obj.\__proto\__对象没有toString属性，那么会继续查看ojb.\_\_proto\_\_.\__proto\__。

4. 如果 obj.\__proto_\_._\_proto__ 也没有，那么浏览器会继续查看 obj.\__proto_\_.\__proto\__.proto\__

5. 直到找到toString或者__proto_\_为null


上面这个过程，就是[读]属性的[搜索过程]

这个搜索过程是连着\__proto__组成的链子一直走的。

*_这个链子就叫做[原型链]_*

### 共享原型链

现在我们有另一个对象
```javascript
    var obj2 = {name:'obj2'}

```

obj.toString和obj2.toString其实是同一个东西，也就是obj2.\__proto\__.toString

如果我们改写obj2.\__proto\__.toString,那么obj.toString其实也会变！

这样obj和obj2就是具有某些相同行为的对象，这就是意义所在。

### 差异化

如果我们想让obj.toString和obj2.toString行为不同怎么做呢？

直接赋值就好了:

```javascript

obj.toString = function(){return '新的toString方法'};

```

### 总结：

[读]属性时会沿着原型链搜索。

[新增]属性时不会去看原型链。(但是如果你给这个属性增加了一些配置，则不一样)

