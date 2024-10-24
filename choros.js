var newsource;

function applychoros(){

    document.getElementById("chrousux").style.display = "none"

    var start = parseFloat(document.getElementById("start").value);
      var end = parseFloat(document.getElementById("end").value);
      const depth = parseFloat(document.getElementById("depth").value);
      const rate = parseFloat(document.getElementById("rate").value);; // Adjust modulation 
    
    
    
    
    document.getElementById('filterux').style.display="none"
     
    clearInterval(intervalid);
    
            var start = parseFloat(document.getElementById("start").value);
        var end = parseFloat(document.getElementById("end").value);
        
        time=0;
            if(source){
                source.stop();
            }
        
            if (waveformsource){
                waveformsource.stop();
            }
            document.getElementById("timer").innerHTML = time;
          
            if (check === null ){
        
        document.getElementById("error").innerHTML = "Please select a file"
        
        }

     
        
        else if (array===null){
        
        document.getElementById("error").innerHTML = "No data available"
        
        }
        
        else if (isNaN(start)){
        document.getElementById("error").innerHTML = "Starting point is not a number"
        
        
        }
        else if (start >= sourceduration){
        document.getElementById("error").innerHTML = "starting point is greater than or equal to source buffer duration"
        
        } 
        
        else if (start < 0 )
        {
        
        document.getElementById("error").innerHTML = "Starting Point must be greater than 0"
        
        }
        else if (start >= end) {
        document.getElementById("error").innerHTML = "Starting Point must be less than Ending Point"
        
        }
        
        else if (isNaN(end)){
        document.getElementById("error").innerHTML = "Ending Point is not a number"
        } 
        else if ( end > sourceduration ){
        
        document.getElementById("error").innerHTML = "Ending point is greater than  duration"
        
        end < 0 }
        
        else if ( end <= start){
        
        document.getElementById("error").innerHTML = "Ending Point is greater than equal to Starting Point"
        
        }

        else if (isNaN(rate) || isNaN(depth)){
            document.getElementById("error").innerHTML = "Rate or Depth is not specified"
        }
    
        else{
         
        const offlineCtx = new OfflineAudioContext(1, audiocontext.sampleRate*sourceduration, audiocontext.sampleRate);
        source1 = offlineCtx.createBufferSource();
      
    var array1 = new Float32Array(array);
          var audiobuffer = offlineCtx.createBuffer(1, array.length, audiocontext.sampleRate);
          var ab1=  audiobuffer.getChannelData(0);
       ab1.set(array);
    
  source1.buffer = audiobuffer;

  // Create a delay node for the delayed signal
  const delayNode = offlineCtx.createDelay();

  // Create a low-frequency oscillator (LFO) to modulate the delay time
  const lfo = offlineCtx.createOscillator();
  lfo.type = 'sine'; // You can use other waveforms like 'triangle' or 'sawtooth'
  lfo.frequency.value = rate; // Modulation rate in Hz

  // Create a gain node to control the depth of the modulation
  const depthNode = offlineCtx.createGain();
  depthNode.gain.value = depth; // Modulation depth

  // Connect the nodes to create the chorus effect
  source1.connect(delayNode);
  source1.connect(offlineCtx.destination);
  delayNode.connect(offlineCtx.destination);

  lfo.connect(depthNode);
  depthNode.connect(delayNode.delayTime);
  lfo.start();

  // Schedule the playback
  source1.start(0);
  source1.stop(end);

  offlineCtx
  .startRendering()
  .then((renderedBuffer) => {

    var array3 = [...array];

                if (undo.length ===3){

                    undo.splice(0, 1)
                   

                    
                }

                undo.push(array3);


      var array10 = renderedBuffer.getChannelData(0)
  
      for (i=start*audiocontext.sampleRate; i<end*audiocontext.sampleRate; i++ ){
     
         array[i] = array10[i]
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
})
     
        }
          
          
          
      var audiobuffer =   audiocontext.createBuffer(1, array.length, audiocontext.sampleRate);
      var ab1=  audiobuffer.getChannelData(0);
   ab1.set(array);
  
      source = audiocontext.createBufferSource()
      source.buffer=audiobuffer;
      source.connect(audiocontext.destination);
      source.start(0,0,0);   
}