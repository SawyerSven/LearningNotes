const request = indexedDB.open("myDatabase", 3);

request.addEventListener("success", e => {
  const db = e.target.result;

  const tx = db.transaction("Users", "readwrite");

  const store = tx.objectStore('Users');
  
  const reqGet = store.get(1);

  reqGet.addEventListener('success',e=>{
    console.log(e.target.result.userName);
  })
});
