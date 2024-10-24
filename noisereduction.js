function noisereductionfun(){
    clearInterval(intervalid);
    
    var start = parseFloat(document.getElementById("start").value);
var end = parseFloat(document.getElementById("end").value);

time = parseInt(start);




  



var final = end - start;

if (sourcecheck === null){

    
    if(source){
        source.stop();
    }

    if (waveformsource){
        waveformsource.stop();
    }
}

if (check === null ){

document.getElementById("error").innerHTML = "Please select a file"

}

else if (array===null){

document.getElementById("error").innerHTML = "No data available"

}

else{

    var array3 = [...array];

    if (undo.length ===3){

        undo.splice(0, 1)
       

        
    }

    undo.push(array3);
    const offlineCtx = new OfflineAudioContext(1, audiocontext.sampleRate*source.buffer.duration, audiocontext.sampleRate);
   
    source = offlineCtx.createBufferSource();
var filter =  offlineCtx.createBiquadFilter()
var array1 = new Float32Array(array);
      var audiobuffer = offlineCtx.createBuffer(1, array.length, audiocontext.sampleRate);
      var ab1=  audiobuffer.getChannelData(0);
   ab1.set(array);

   filter.Q.value = 2.30;
   filter.frequency.value = 1000;
   filter.gain.value = 3.0;
   filter.type = 'bandpass';
         
         source.buffer=audiobuffer;
         source.connect(filter);
         filter.connect(offlineCtx.destination)
         source.start(0);
         offlineCtx
        .startRendering()
        .then((renderedBuffer) => {
         
array = renderedBuffer.getChannelData(0)

var canvascontext = document.getElementById('canvas11');

var canctx = canvascontext.getContext('2d');
canctx.clearRect(0,0,canvascontext.width, canvascontext.height)
canctx.fillStyle = "black"
canctx.beginPath();
canctx.moveTo(0, canvascontext.height / 2);
canctx.lineWidth = 1;
const topOffset = 10;
const bottomOffset = 10;
for (let i = 0; i < array.length; i=i+500) {
const x = i / array.length * canvascontext.width;
const y = ((array[i] + 1) / 2 * (canvascontext.height - topOffset - bottomOffset)) + topOffset;
canctx.lineTo(x, y);
}
canctx.stroke();

          
          })


          

        }
}