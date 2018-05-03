

import './css/style.css';

let a = 1;


((test) => {
  console.log(test);
})(a)



if(module.hot){
  module.hot.accept();
}