function applyfilter(){

    var start = parseFloat(document.getElementById("start").value);
      var end = parseFloat(document.getElementById("end").value);
    
  
      var freqvalue =  parseFloat(document.getElementById('filterfreq').value)
      var filterqvalue =  parseFloat(document.getElementById('filterq').value)   
      var filterselect = document.getElementById('filtertype').value; 
     var biquadgain = parseFloat(document.getElementById('biquadgain').value)
    
    
    
    
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
        else if (start >= source.buffer.duration){
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
        else if ( end > source.buffer.duration ){
        
        document.getElementById("error").innerHTML = "Ending point is greater than  duration"
        
        end < 0 }
        
        else if ( end <= start){
        
        document.getElementById("error").innerHTML = "Ending Point is greater than equal to Starting Point"
        
        }
    
        else{
        const offlineCtx = new OfflineAudioContext(1, audiocontext.sampleRate*source.buffer.duration, audiocontext.sampleRate);
       
        source = offlineCtx.createBufferSource();
    var filter =  offlineCtx.createBiquadFilter()
    var array1 = new Float32Array(array);
          var audiobuffer = offlineCtx.createBuffer(1, array.length, audiocontext.sampleRate);
          var ab1=  audiobuffer.getChannelData(0);
       ab1.set(array);
    
       
       var getvalue = document.getElementById('filtertype1').value;
       if (getvalue ==='set value at time'){
        if ( isNaN(freqvalue)||freqvalue === ' '){
            console.log("no freq value")
        }
    
        else{
          var array3 = [...array];
  
          if (undo.length ===3){
  
              undo.splice(0, 1)
             
  
              
          }
  
          undo.push(array3);
       filter.frequency.setValueAtTime(freqvalue, start);
       if (isNaN(filterqvalue)||filterqvalue ===" "){
  
       }
       else{
       filter.Q.value = filterqvalue;
   }
  
   if (isNaN(biquadgain)||biquadgain ===" "){
  
   }
   else{
   filter.gain.value = biquadgain;
  }
       filter.type = filterselect;
    
             source.buffer=audiobuffer;
             source.connect(filter);
             filter.connect(offlineCtx.destination)
             source.start(0);
             source.stop(end);
    
             offlineCtx
            .startRendering()
            .then((renderedBuffer) => {
             
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
    }
    
    else if (getvalue==='linear ramp'){
        var ramp1 = parseFloat(document.getElementById('ramp').value)
        if (isNaN(ramp1)|| ramp1 === ' '|| isNaN(freqvalue)||freqvalue === " "){
            console.log("no value in ramp")
        }
        else{
  
          var array3 = [...array];
  
          if (undo.length ===3){
  
              undo.splice(0, 1)
             
  
              
          }
  
          undo.push(array3);
  
          if (isNaN(filterqvalue)||filterqvalue ===" "){
  
          }
          else{
          filter.Q.value = filterqvalue;
      }
  
      if (isNaN(biquadgain)||biquadgain ===" "){
  
      }
      else{
      filter.gain.value = biquadgain;
     }
    filter.frequency.setValueAtTime(freqvalue, start);
       filter.frequency.linearRampToValueAtTime(ramp1, end)
    
       filter.type = filterselect;
    
             source.buffer=audiobuffer;
             source.connect(filter);
             filter.connect(offlineCtx.destination)
             source.start(0);
             source.stop(end);
    
             offlineCtx
            .startRendering()
            .then((renderedBuffer) => {
             
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
    }
    else if (getvalue==='exponential ramp'){
        var ramp1 = parseFloat(document.getElementById('ramp').value)
        if (isNaN(ramp1)|| ramp1 === ' '|| isNaN(freqvalue)||freqvalue===" "){
            console.log("no value in ramp")
        }
        else{
          var array3 = [...array];
  
          if (undo.length ===3){
  
              undo.splice(0, 1)
             
  
              
          }
  
          undo.push(array3);
  
          if (isNaN(filterqvalue)||filterqvalue ===" "){
  
          }
          else{
          filter.Q.value = filterqvalue;
      }
  
      if (isNaN(biquadgain)||biquadgain ===" "){
  
      }
      else{
      filter.gain.value = biquadgain;
     }
    filter.frequency.setValueAtTime(freqvalue, start);
       filter.frequency.exponentialRampToValueAtTime(ramp1, end)
    
       filter.type = filterselect;
    
    source.buffer=audiobuffer;
    source.connect(filter);
    filter.connect(offlineCtx.destination)
    source.start(0);
    source.stop(end);
    
    offlineCtx
    .startRendering()
    .then((renderedBuffer) => {
    
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
    }}
    
    else{
    
    }
       
    
    
              
            }
          
          
          
      var audiobuffer =   audiocontext.createBuffer(1, array.length, audiocontext.sampleRate);
      var ab1=  audiobuffer.getChannelData(0);
   ab1.set(array);
  
      source = audiocontext.createBufferSource()
      source.buffer=audiobuffer;
      source.connect(audiocontext.destination);
      source.start(0,0,0);   
          
          }