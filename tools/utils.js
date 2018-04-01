const electron = require('electron');
const {ipcRenderer} = electron;

var requestData;

document.getElementById("httpDataField").onkeydown = function(e){
  if (e.keyCode == 9 || e.which == 9) {
    e.preventDefault();
    let s = this.selectionStart;
    this.value = this.value.substring(0,this.selectionStart) + "\t" + this.value.substring(this.selectionEnd);
    this.selectionEnd = s+1;
  }
}

var getHttp = function(){
  // clear the response field first

  document.getElementById("httpResults").value = "";

  let httpType = document.getElementById("httpSelect").value;
  let addr = document.getElementById("httpAddr").value;
  if (addr == "") {
    addr = "localhost:9999/api/data"
  }
  addr = addr.match(/https?\:\/\//) ? addr : "http://" + addr;
  console.log("Button clicked!");

  var data = document.getElementById("httpDataField").value;

  console.log(data);

  defaultData = {
    name: "Dude",
    profession: "CEO",
    available: true
  };

  if (data == "") {
    data = defaultData;
    console.log("Data is empty");
  } else {
    data = JSON.parse(data);
    console.log("Data parsed.");
  }

  console.log(data);

  data = JSON.stringify(data);

  // Create request object, send request (with or without data)
  // and then have callback which puts the response data in
  // the HTML element 

  let xhr = new XMLHttpRequest();
  xhr.open(httpType,addr);
  xhr.setRequestHeader('Content-Type','application/json');
  xhr.send(data);
  xhr.onreadystatechange = function(){
    if (xhr.readyState == 4) {
      console.log("Ready State is 4");
      if (xhr.status == 200) {
        console.log("Status is 200");
        console.log(xhr);
        document.getElementById('httpResults').value = xhr.responseText;
      }
    }
  }

}
