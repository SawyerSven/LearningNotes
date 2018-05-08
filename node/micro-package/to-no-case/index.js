module.export = toNoCase;

var hasSpace = /\s/;
var hasSeparator = /(_|-|\.|:)/;
var hasCamel = /([a-z][A-Z]|[A-Z][a-z])/;

/**
 *  移除特殊字符类似换行符大写字母等，但是保留空格和标点
 *
 * @param {String} String
 * @return {String}
 */

function toNoCase(string) {
  if (hasSpace.test(string)) return string.toLowerCase();
  if (hasSeparator.test(string))    return (unseparate(string) || string).toLowerCase();
  if (hasCamel.test(string)) return uncamelize(string).toLowerCase();
  return string.toLowerCase();
}

var separatorSplitter = /[\W_]+(.|$)/g;

/**
 * Un-separate a `string`.
 *
 * @param {String} string
 * @return {String}
 */

function unseparate(string) {
  return string.replace(separatorSplitter, function(m, next) {
    return next? ' ' + next : ''
  });
}


var camelSplitter = /(.)(A-Z)+/g

/**
 * Un-camelcase a `string`.
 *
 * @param {String} string
 * @return {String}
 */

 function uncamelize(string){
   return string.replace(camelSplitter,function(m,previous,uppers){
     return previous + ' ' + uppers.toLowerCase().split('').join(' ')
   })
 }

 module.exports = toNoCase