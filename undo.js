function undodata(){
    
    
    document.getElementById("error").innerHTML = "";
if (undo.length >0){

    if (source){
source.stop()
}

clearInterval(intervalid);
time = 0;

array = undo[undo.length-1];
undo.pop();


document.getElementById("totallength").innerHTML=array.length;
source = audiocontext.createBufferSource();
var array1 = new Float32Array(array);
var audiobuffer = audiocontext.createBuffer(1, array.length, audiocontext.sampleRate);
var ab1=  audiobuffer.getChannelData(0);
ab1.set(array);

source.buffer=audiobuffer;
source.connect(audiocontext.destination);
source.start(0);
sourceduration = source.buffer.duration;
document.getElementById("duration").innerHTML = source.buffer.duration;
if ( source.buffer.duration >=1){
intervalid =   setInterval(()=>{
time++;
document.getElementById("timer").innerHTML = time;
if (time === parseInt(source.buffer.duration)){
clearInterval(intervalid);
}
}, 1000);
}

}

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








}