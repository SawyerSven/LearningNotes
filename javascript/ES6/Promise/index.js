setTimeout(function() {
  console.log("1");
}, 0);


Promise.resolve().then(function() {
  console.log("2");
});

new Promise((resolve, reject) => {
  console.log("3");
  resolve();
}).then(() => {
  console.log("4");
});


process.nextTick(function(){
  console.log('5');
})

console.log("6");
