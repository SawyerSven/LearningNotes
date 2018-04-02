const slice = Array.prototype.slice;
const toArray = function(a) {
  return slice.call(a);
};
const tail = function(a) {
  return slice.call(a, 1);
};

// fn, [value] -> fn
//-- create a curried function, incorporating any number of
//-- pre-existing arguments (e.g. if you're further currying a function).

const createFn = function(fn, args, totalArity) {
  let remainingArity = totalArity - args.length;

  switch (remainingArity) {
    case 0: return function(){ return processInvocation(fn, concatArgs(args, arguments), totalArity) };
    case 1: return function(a){ return processInvocation(fn, concatArgs(args, arguments), totalArity) };
    case 2: return function(a,b){ return processInvocation(fn, concatArgs(args, arguments), totalArity) };
    case 3: return function(a,b,c){ return processInvocation(fn, concatArgs(args, arguments), totalArity) };
    case 4: return function(a,b,c,d){ return processInvocation(fn, concatArgs(args, arguments), totalArity) };
    case 5: return function(a,b,c,d,e){ return processInvocation(fn, concatArgs(args, arguments), totalArity) };
    case 6: return function(a,b,c,d,e,f){ return processInvocation(fn, concatArgs(args, arguments), totalArity) };
    case 7: return function(a,b,c,d,e,f,g){ return processInvocation(fn, concatArgs(args, arguments), totalArity) };
    case 8: return function(a,b,c,d,e,f,g,h){ return processInvocation(fn, concatArgs(args, arguments), totalArity) };
    case 9: return function(a,b,c,d,e,f,g,h,i){ return processInvocation(fn, concatArgs(args, arguments), totalArity) };
    case 10: return function(a,b,c,d,e,f,g,h,i,j){ return processInvocation(fn, concatArgs(args, arguments), totalArity) };
    default: return createEvalFn(fn, args, remainingArity);
  }
};

var concatArgs = function(arg1, arg2) {
  return arg1.concat(toArray(arg2));
};

var createEvalFn = function(fn, args, arity) {
  var argList = makeArgList(arity);

  var fnStr =
    "false||" +
    "function(" +
    argList +
    "){return processInvocation(fn,concatArgs(args,arguments));}";
  return eval(fnStr);
};

var makeArgList = function(len) {
  var a = [];
  for (var i = 0; i < len; i += 1) a.push("a" + i.toString());
  return a.join(",");
};

var trimArrLength = function(arr, length) {
  if (arr.length > length) return arr.slice(0, length);
  else return arr;
};

var processInvocation = function(fn,argsArr,totalArity){
  argsArr = trimArrLength(argsArr,totalArity);

  if(argsArr.length == totalArity)return fn.apply(null,argsArr);
  return createFn(fn,argsArr,totalArity);
}

var curry = function(fn){
  return createFn(fn,[],fn.length);
}


curry.adaptTo = curry(function(num,fn){
  return curry.to(num,function(context){
     var args = tail(arguments).concat(context);
     return fn.apply(this,args);
  })
})

curry.adapt = function(fn){
  return curry.adaptTo(fn,length,fn)
}

module.exports = curry;