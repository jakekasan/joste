var Comm = function(addr,type,data=null){

  this.xhr = new XMLHttpRequest();
  this.addr = addr;
  this.type = type;
  this.data = (data=null) ? "" : data;

  var send(){
    this.xhr.open(type,addr);
    this.send(data);

    this.xhr.onreadystatechange = function(){
      let DONE = 4;
      let OK = 200;
      if (this.xhr.readyState === DONE) {
        if (this.xhr.status === OK) {
          // everything went fine
          console.log("I GOT A RESPONSE");
        } else {
          // state changed but the status is not OK...
          console.log("Something went wrong...");
        }
      }
    }
  }




}
