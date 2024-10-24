function loadsample() {

    document.getElementById("status").innerHTML = "Loading and decoding file..."
     
            clearInterval(intervalid);
    
        if (audiocontext === undefined){
     
     audiocontext= new AudioContext();
    }
    
    
    if (source){
     source.stop();
    }
    if (waveformsource){
            waveformsource.stop();
        }






        fetch('sample.mp3')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.arrayBuffer();
        })
        .then(audioData => {
            audiocontext.decodeAudioData(audioData, function(audiofile){
                var x = audiofile.getChannelData(0);
                var y = Array.from(x);
                try{
                    if (array===null){
                        array = y;
                        sourceduration = 0;
                        
                    }
                    else{
        
                        if (undo.length ===3){
        
                            undo.splice(0, 1)
                           
        
                            
                        }
            
                        if(array.length>0){
                            undo.push([...array])
                        }
            
                        array = array.concat(y);
                    }
                    
                }
                catch(error){
                    alert('Limit Exceed');
                    console.error("error");
                    sourceduration=0;
                }
            
                document.getElementById("totallength").innerHTML=array.length;
                source = audiocontext.createBufferSource();
            check = 1;
            
                time = parseInt(sourceduration);
               
                
                document.getElementById("error").innerHTML = "";
            
            
            
               
            var array1 = new Float32Array(array);
                var audiobuffer = audiocontext.createBuffer(1, array.length, audiocontext.sampleRate);
                var ab1=  audiobuffer.getChannelData(0);
             ab1.set(array);
            
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
            
            
            
               
                   
                   source.buffer=audiobuffer;
                   source.connect(audiocontext.destination);
                   source.start(0, sourceduration);
                   sourceduration = source.buffer.duration;
                   
                   document.getElementById("duration").innerHTML = source.buffer.duration.toFixed(3);
            
               if (source.buffer.duration>=1){
            intervalid =   setInterval(()=>{
                    time++;
                document.getElementById("timer").innerHTML = time;
            
                if (time ===parseInt(source.buffer.duration)){
                    clearInterval(intervalid);
                }
                
            }, 1000);
            }
            document.getElementById("status").innerHTML = "";
            document.getElementById("Spinner").style.display = "none"
            document.getElementById("spinner1").style.display = "none"
               })
        })
        .catch(error => {
            document.getElementById("status").innerHTML = "";
            document.getElementById("error").innerHTML = "Cannot open file"
            document.getElementById("Spinner").style.display = "none"
            document.getElementById("spinner1").style.display = "none"
        });
      
      
      
      
      
    
    
}
    
   