function cut(){

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
            document.getElementById("timer").innerHTML = time;
            var array1;
    
            if (end*source.buffer.sampleRate >= 1){

                var array3 = [...array];

                if (undo.length ===3){

                    undo.splice(0, 1)
                   

                    
                }

                undo.push(array3);
            
            array1 = array.slice(parseInt(start*audiocontext.sampleRate), parseInt(end*audiocontext.sampleRate));
    
            array = array1;
            document.getElementById("start").value="";
            document.getElementById("end").value="";
    
    document.getElementById("totallength").innerHTML=array.length;
    }
       source = audiocontext.createBufferSource();
      
    array1 = new Float32Array(array);
    
    
    
    
        var audiobuffer =   audiocontext.createBuffer(1, array.length, audiocontext.sampleRate);
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
          source.start(0);
          sourceduration = source.buffer.duration;
          document.getElementById("duration").innerHTML = source.buffer.duration.toFixed(3);
       if (source.buffer.duration>=1){
    
       
       
    intervalid =   setInterval(()=>{
           time++;
       document.getElementById("timer").innerHTML = time;
       if (time === parseInt(source.buffer.duration)){
           clearInterval(intervalid);
       }
    }, 1000);
        }
    }
    
    
        
    
    
    
     
    
    }
    
    