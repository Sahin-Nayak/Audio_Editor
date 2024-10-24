var source1;

function choruspreview(){


    var start = parseFloat(document.getElementById("start").value);
      var end = parseFloat(document.getElementById("end").value);
      const depth = parseFloat(document.getElementById("depth").value);
      const rate = parseFloat(document.getElementById("rate").value);; // Adjust modulation 
    
    var final = end -start
    
    
     
    clearInterval(intervalid);
            var start = parseFloat(document.getElementById("start").value);
        var end = parseFloat(document.getElementById("end").value);
        
        time=0;
            if(source){
                source.stop();
            }

            if(source1){
                source1.stop();
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
         
        const offlineCtx = new AudioContext();
        source1 = offlineCtx.createBufferSource();
      
        var array1 = [final*offlineCtx.sampleRate];

        for (i=0; i<final*audiocontext.sampleRate; i++ ){
                 
          array1[i] = array[i+start*offlineCtx.sampleRate]
       }
          var audiobuffer = offlineCtx.createBuffer(1, array.length, audiocontext.sampleRate);
          var ab1=  audiobuffer.getChannelData(0);
       ab1.set(array1);
    
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

 


  
    
  
     
        }
           
}