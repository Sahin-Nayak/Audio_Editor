function exportdata(){

    

  if (check!=null && array !== null){

      document.getElementById("status").innerHTML = "Encoding in Progress it may take some time";
      document.getElementById("Spinner").style.display = "block"
      document.getElementById("spinner1").style.display = "block"
      
      var buttons = document.getElementsByClassName("button")
      var buttons1 = document.getElementsByClassName("button2")

  const obj ={
      
      data: array,
      samplerate: source.buffer.sampleRate
  
  }

var  w = new Worker("worker.js");
  w.postMessage(obj);

  w.onmessage = function(event) {
const result = event.data;
const blob = new Blob(result, { type: "audio/mp3" });
const audioURL = window.URL.createObjectURL(blob);
var a = document.createElement("a");
a.href = audioURL;
a.download = "downloaded.mp3";
document.body.appendChild(a);
a.click();
document.body.removeChild(a);
document.getElementById("status").innerHTML = "";
document.getElementById("Spinner").style.display = "none"
document.getElementById("spinner1").style.display = "none"
var buttons = document.getElementsByClassName("button")
var buttons1 = document.getElementsByClassName("button2")



};
}

else {

  document.getElementById("error").innerHTML = "Please select a file";
}
}