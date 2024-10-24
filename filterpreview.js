function filterpreview(){

    var start = parseFloat(document.getElementById("start").value);
      var end = parseFloat(document.getElementById("end").value);
    var final = end -start
  
      var freqvalue =  parseFloat(document.getElementById('filterfreq').value)
      var filterqvalue =  parseFloat(document.getElementById('filterq').value)   
      var filterselect = document.getElementById('filtertype').value; 
     var biquadgain = parseFloat(document.getElementById('biquadgain').value)
         
    clearInterval(intervalid);
            var start = parseFloat(document.getElementById("start").value);
        var end = parseFloat(document.getElementById("end").value);
        
        time=0;
            if(source !== null){
                source.stop();
            }

            if(source1!==null){
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

        else if (isNaN(freqvalue)&&isNaN(filterqvalue) && isNaN(filterselect) && isNaN(biquadgain)){
console.log("no value selected")
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
        const offlineCtx = new AudioContext();
       
        source1 = offlineCtx.createBufferSource();
    var filter =  offlineCtx.createBiquadFilter()
    var array1 = [final*offlineCtx.sampleRate];

    for (i=0; i<final*audiocontext.sampleRate; i++ ){
             
      array1[i] = array[i+start*offlineCtx.sampleRate]
   }          var audiobuffer = offlineCtx.createBuffer(1, array1.length, audiocontext.sampleRate);
          var ab1=  audiobuffer.getChannelData(0);
       ab1.set(array1);
    
       
       var getvalue = document.getElementById('filtertype1').value;
       if (getvalue ==='set value at time'){
        if ( isNaN(freqvalue)||freqvalue === ' '){
          
            source1.buffer=audiobuffer;
            source1.connect(filter);
            filter.connect(offlineCtx.destination)
            source1.start(0, 0, 0);
        }
    
        else{
         
       filter.frequency.setValueAtTime(freqvalue, 0);
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
    
             source1.buffer=audiobuffer;
             source1.connect(filter);
             filter.connect(offlineCtx.destination)
             source1.start(0);
    
            
    }
    }
    
    else if (getvalue==='linear ramp'){
        var ramp1 = parseFloat(document.getElementById('ramp').value)
        if (isNaN(ramp1)|| ramp1 === ' '|| isNaN(freqvalue)||freqvalue === " "){
            source1.buffer=audiobuffer;
            source1.connect(filter);
            filter.connect(offlineCtx.destination)
            source1.start(0, 0, 0);
        }
        else{
  
  
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
    filter.frequency.setValueAtTime(freqvalue, 0);
       filter.frequency.linearRampToValueAtTime(ramp1, array1.length / offlineCtx.sampleRate)
    
       filter.type = filterselect;
    
             source1.buffer=audiobuffer;
             source1.connect(filter);
             filter.connect(offlineCtx.destination)
             source1.start(0);
    
           
    }
    }
    else if (getvalue==='exponential ramp'){
        var ramp1 = parseFloat(document.getElementById('ramp').value)
        if (isNaN(ramp1)|| ramp1 === ' '|| isNaN(freqvalue)||freqvalue===" "){
            source1.buffer=audiobuffer;
            source1.connect(filter);
            filter.connect(offlineCtx.destination)
            source1.start(0, 0, 0);
        }
        else{
  
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
    filter.frequency.setValueAtTime(freqvalue, 0);
       filter.frequency.exponentialRampToValueAtTime(ramp1, array1.length / offlineCtx.sampleRate)
    
       filter.type = filterselect;
    
    source1.buffer=audiobuffer;
    source1.connect(filter);
    filter.connect(offlineCtx.destination)
    source1.start(0);
    
  
    }}
    
    else{
    
    }
       
    
    
              
            }
          
          
          
          
          }