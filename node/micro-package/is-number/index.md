* 使用 num.trim() === ""来判断是否为空字符串;

* 最后返回的(num-num+1) === 1 进行了隐式转换，如果 num 是一个非数字类型的 string 则会返回 NaN。

- \*_js 中，加号运算符遇到 String 和其他类型，其他类型都会转化为 String。其他运算符则转化为 Number_,

```javascript
'text'+undefined // textundefined
'text'+NaN       // textNaN
'text'+123       // text123
'text'+false     // textfalse

'123' - 123      // 0
'123' - '123'    // 0
'text' - 123      // NaN
'text' - '123'    // NaN

NaN == NaN   // NaN不与任何值相等

<!-- 转换boolean类型为false的有: null , 0 , "", undefined,NaN,false -->
```
