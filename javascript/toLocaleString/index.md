## toLocaleString

### 语法

> numObj.toLocaleString([locales,[,options]])

#### 参数

**locales**

可选：缩写语言代码的字符串或者这些字符串组成的数组。

**options**

可选，包含一些或所有下面属性的类:

**localMatcher**

使用的 local 的匹配算法，可能的值有"lookup"和"best fit",默认是:_best fit_

**style**

格式化时使用的样式，可能的值有"decimal"表示纯数字格式,'currency'表示货币格式，和'percent'表示百分比格式，默认值是 _style_

**currency**

在货币格式化中使用的货币符号.可能的值是 ISO 的货币代码.例如:"USD"表示美元,"EUR"表示欧元,"CNY"表示人民币。_如果样式是 currency_.必须提供货币属性。

**currencyDisplay**

如何在货币格式化中显示货币，可能的值有"symbol"表示使用本地化的货币符号例如：€, "code"表示使用国际组织标准货币代码，"name"表示使用本地化的货币名称，如"dollar";默认值是 _symbol_

**useGrouping**

是否使用分组分隔符，如千位分隔符或千/万/亿分隔符，可能的值是 true 和 false,默认值是 _true_


最后是两组属性：

1. __munimumIntergerDigits__

使用的整数数字的最小数目(位数),可能的值是从1到21,默认值是1 

2. __minimumFractionDigits__

使用的小数位数的最小数目(位数)，可能的值是从0到20。默认为普通的数字和百分比格式为0；

3. __maximumFractionDigits__

使用的小数位数的最大数目。可能的值是从0到20;纯数字格式的默认值是minimumFractionDigist和3中大的哪一个。百分比格式默认值是minimumfractiondigits和0中大的哪一个。

第二组:

1. __minimumSignificantDigits__

使用的有效数字的最小数目：可能值是从0到21；默认值是1.

2. __maximumSignificantDigits__

使用的有效数字的最大数量。可能的值是从1到21，默认是minimumsignificantdigits。


> 如果使用了第二组属性，第一组属性则全部忽略不算。 _maximumFractionDigits_与 _maximumSignificantDigits_均是四舍五入。

#### 返回值

返回一个语言环境下的表示字符串

### 示例

locales 和 options 参数目前不是所有浏览器都支持，在 ES5.1 和更新的实现中检查支持情况，可以依靠使用非法参数时规定抛出的 RangeError 异常：

```javascript
function toLocaleStringSupportsLocales() {
    var number = 0;
    try{
        number.toLocaleString('i');
    }catch(e){
        return e.name === 'RangeError';
    }
    return false;
}
```
```javascript

function toLocaleStringSupportsOptions() {
  return !!(typeof Intl == 'object' && Intl && typeof Intl.NumberFormat == 'function');
}

```
它测试全局的Intl对象，检测它不是null并且有NumberFormat的方法。


### 性能

当格式化大量数字时候，最好建立一个NumberFormat对象并且使用它提供的NumberFormat.format方法.

