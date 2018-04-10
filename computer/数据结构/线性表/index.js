class List {
  constructor() {
    this.listSize = 0;
    this.dataStore = [];
    this.pos = 0;
  }
  findItem(index) {
    return this.dataStore[index];
  }
  initFind(item) {
    if (this.dataStore.indexOf(item) > -1) {
      return this.dataStore.indexOf(item);
    }else{
      console.log('未找到该元素');
    }
  }
  insert(item,index){
     return this.dataStore.splice(index,0,item)
  }

  delete(index){
     return this.dataStore.splice(index,1);
  }

  getLength(){
    return this.dataStore.length;
  }

}

let arr = new List();

console.log(arr);
