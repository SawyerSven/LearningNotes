function myVue(options) {
  this._init(options);
}

myVue.prototype._init = function(options) {
  this.$options = options;
  this.$el = document.querySelector(options.el);
  this.$data = options.data;
  this.$methods = options.methods;
  this._binding = {}; //_binding保存着model与view的映射关系，也就是我们前面定义的watcher的实例。。当model改变时，我们会触发其中的指令类更新，保证view也能实时更新

  this._observe(this.$data);

  this._complie(this.$el);
};

myVue.prototype._observe = function(obj) {
  // obj = {number:0}
  var value;
  for (key in obj) {
    //遍历obj对象
    if (obj.hasOwnProperty(key)) {
      // 按照前面的数据._binding = {number:_directives:[]}
      this._binding[key] = {
        _directives: []
      };
      value = obj[key];
      if (typeof value === "object") {
        // 如果值还是对象，遍历处理
        this._observe(value);
      }
      var binding = this._binding[key];
      Object.defineProperty(this.$data, key, {
        enumerable: true,
        configurable: true,
        get: function() {
          console.log(`获取${value}`);
          return value;
        },
        set: function(newVal) {
          console.log(`更新${newVal}`);
          if (value !== newVal) {
            value = newVal;
            binding._directives.forEach(item => {
              // 当number改变时，触发_binding[number]._directives中绑定的Watcher类更新
              item.update();
            });
          }
        }
      });
    }
  }
};

myVue.prototype._complie = function(root) {
  //root为id为app的Element元素，也就是我们的根元素

  var _this = this;
  var nodes = root.children;

  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    if (node.children.length) {
      this._complie(node);
    }

    if (node.hasAttribute("v-click") || node.hasAttribute("@click")) {
      node.onclick = (function() {
        var attrVal = nodes[i].getAttribute("v-click") || nodes[i].getAttribute("@click");
        return _this.$methods[attrVal].bind(_this.$data); // bind是使得data的作用域与method函数的作用域保持一致
      })();
    }

    if (
      node.hasAttribute("v-model") &&
      (node.tagName == "INPUT" || node.tagName == "TEXTAREA")
    ) {
      node.addEventListener(
        "input",
        (function(key) {
          var attrVal = node.getAttribute("v-model");
          //_this._binding['number']._directives = [一个Watcher实例]
          // 其中Watcher.prototype.update = function () {
          //	node['vaule'] = _this.$data['number'];  这就将node的值保持与number一致
          // }
          _this._binding[attrVal]._directives.push(
            new Watcher("input", node, _this, attrVal, "value")
          );

          return function() {
            _this.$data[attrVal] = nodes[key].value; // 使number的值与node的value保持一致
          };
        })(i)
      );
    }

    if (node.hasAttribute("v-bind")) {
      var attrVal = node.getAttribute("v-bind");
      _this._binding[attrVal]._directives.push(
        new Watcher("text", node, _this, attrVal, "innerHTML")
      );
    }
  }
};

function Watcher(name, el, vm, exp, attr) {
  this.name = name; //指令名称,例如文本节点，该值设为"text"
  this.el = el; // 指令对应的DOM元素
  this.vm = vm; // 指令所属的myVue实例
  this.exp = exp; // 指令对应的值,本例如"number"
  this.attr = attr; // 绑定的属性值，本例为"innerHTML"

  this.update();
}

Watcher.prototype.update = function() {
  this.el[this.attr] = this.vm.$data[this.exp]; // 比如H3.innerHTML = this.$data.number;当number改变时，会触发这个update函数,保证对应的DOM内容进行了更新
};
