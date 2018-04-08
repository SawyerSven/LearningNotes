## JS的new到底是干什么的

假设我们要[制造士兵]:

```javascript

var 士兵 ={
    id:1,
    兵种:'步兵',
    生命值:100,
    攻击力:21,
    行走:function(){/**行走的代码**/},
    奔跑:function(){/**奔跑的代码**/},
    死亡:function(){/**死亡的代码**/},
    攻击:function(){/**攻击的代码**/},
    防御:function(){/**防御的代码**/},
}

兵营.制造(士兵)

```

### 制造100个士兵

用原型链可以解决重复创建的问题:**先创建一个[士兵原型],然后让[士兵]的__proto__指向[士兵原型]**

```javascript

var 士兵原型 = {
    兵种:'步兵',
    攻击力:21,
    行走:function(){/**行走的代码**/},
    奔跑:function(){/**奔跑的代码**/},
    死亡:function(){/**死亡的代码**/},
    攻击:function(){/**攻击的代码**/},
    防御:function(){/**防御的代码**/},
}

var 士兵们 = []
var 士兵;

for(var i =1 ;i<=100;i++){
    士兵 = {
        id:i,
        生命:100
    }

/*实际工作中不要这样写，因为__proto__不是标准属性*/
士兵.__proto__ = 士兵原型

士兵们.push(士兵)
}

兵营.批量制造(士兵们)

```

### 优雅

```javascript

function 士兵(ID){
    var 临时对象 = {};     // 创建临时对象

    临时对象.__proto__ = 士兵.原型 //绑定原型

    临时对象.ID = ID
    临时对象.生命值 = 42;

    return 临时对象   // return 
}


士兵.原型 = {               // prototype
    兵种:"美国大兵",
    攻击力:5,
    行走:function(){/**行走的代码**/},
    奔跑:function(){/**奔跑的代码**/},
    死亡:function(){/**死亡的代码**/},
    攻击:function(){/**攻击的代码**/},
    防御:function(){/**防御的代码**/},
}

//保存为文件:士兵.js

```

热按后就可以愉快地引用[士兵]来创建士兵了:

```javascript

var 士兵们 = [];
for(var i = 0;i<100;i++){
    士兵们.push(士兵(i))
}

兵营.批量制造(士兵们)

```

只要在士兵前面使用new关键字，那么可以少做四件事:

1. 不用创建临时对象，因为new会帮你做 (使用[this]就可以访问到临时对象)

2. 不用绑定原型，因为new会帮你做 (new 为了知道原型在哪，所以指定原型的名字为prototype)

3. 不用return 临时对象，因为new 会帮你做

4. 不要给原型想名字了，因为new指定名字为prototype


### 使用new来写

```javascript

function 士兵(ID){
    this.ID = ID;
    this.生命值 = 42
}

士兵.prototype = {
    兵种:"美国大兵",
    攻击力:5,
    行走:function(){/**行走的代码**/},
    奔跑:function(){/**奔跑的代码**/},
    死亡:function(){/**死亡的代码**/},
    攻击:function(){/**攻击的代码**/},
    防御:function(){/**防御的代码**/},
}

```

然后就是创建士兵:

```javascript

var 士兵们 = [];
for(var i = 0; i< 100; i++){
    士兵们.push(new 士兵(i))
}

兵营.批量制造(士兵们)

```

**new 的作用，就是省那么几行代码。（也就是所谓的语法糖）**

### 注意constructor属性

new操作为了记录[临时对象是由哪个函数创建的],所以预先给[士兵.prototype]加了一个constructor属性：

```javascript

士兵.prototype = {
    constructor : 士兵
}

```

如果你重新对[士兵prototype]赋值，那么这个constructor属性就没了，所以应该这么写:

```javascript
士兵.prototype.兵种 = "美国大兵"
士兵.prototype.攻击力 = 5
士兵.prototype.行走 = function(){ /*走俩步的代码*/}
士兵.prototype.奔跑 = function(){ /*狂奔的代码*/  }
士兵.prototype.死亡 = function(){ /*Go die*/    }
士兵.prototype.攻击 = function(){ /*糊他熊脸*/   }
士兵.prototype.防御 = function(){ /*护脸*/       }

```

或者也可以自己给constructor重新赋值:

```javascript

士兵.prototype = {
    constructor:士兵,
    兵种:"美国大兵",
    攻击力:5,
    行走:function(){ /*走俩步的代码*/},
    奔跑:function(){ /*狂奔的代码*/  },
    死亡:function(){ /*Go die*/    },
    攻击:function(){ /*糊他熊脸*/   },
    防御:function(){ /*护脸*/       }
}


```