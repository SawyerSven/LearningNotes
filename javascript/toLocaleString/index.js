/**
 * @description 假设需要格式化金钱
 */

let money = 66666.66;

let format = money.toLocaleString("zh",{style:'currency',currency:'CNY',currencyDisplay:'symbol'});

console.log(format);
