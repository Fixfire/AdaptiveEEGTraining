function View() {}

module.exports = View;


//Distinzione tra azioni
View.prototype.actions = function( JSONaction ){
    
    var settings = JSON.parse(JSONaction);
    
    var label = settings.label;
    
    if(label == "video"){
        
        var action = settings.action;
        
        if(action == "load"){
            if(settings.path != undefined){
                this.videoOnScreen(settings.path);
            }
        }
        if(action == "play"){
            console.log("PLAY VIDEO!");
            this.playVideo();
        }
    }
    
   if(label == "music"){         
        
        var action = settings.action;
        
        if(action == "play"){
            if(settings.path != undefined && settings.final_intensity != undefined){
                startMusic(settings.path, settings.final_intensity);
            }
        }
       
        if(action == "continue"){
            if(settings.final_intensity != undefined){
                changeMusicVolume(settings.final_intensity);
            }
        }
        if(action == "stop"){
            stopMusic();
        }
    }
    
    if(label == "light"){
        if(settings.color != undefined && settings.final_intensity != undefined){
            this.setLights(settings.color, settings.final_intensity);
        }
    }
}

View.prototype.followingActions = function(JSONaction,action) {
    
    var settings = JSON.parse(JSONaction);
    
    var label = settings.label;
    console.log(settings.intensity);
  
   if(label == "music"){         
        
        if(action == "play"){
            startMusic(settings.path, settings.intensity);
        }
       
        if(action == "continue"){
            changeMusicVolume(settings.intensity);
        }
        if(action == "stop"){
            console.log("STOPPING MUSIC");
            stopMusic();
        }
    }
    
    if(label == "light"){
        this.setLights(settings.color, settings.intensity);
    }
}


View.prototype.updateGraph = function( packet ) {
    
    var chart1 = chrome.app.window.get("controlPanel").contentWindow.chart1;
    var data = dateFormatter(new Date(packet.timestamp));
   
    chart1.dataProvider.push({
        "column-1": packet.attention,
        "column-2": packet.meditation,
        "date": data
    });
    chart1.validateData();
}

View.prototype.updateActions = function( event ){
        
        if(event.label == "video"){
            
            var date = dateFormatter(new Date(event.timestamp));
            
            var point = {
			"date": date,
			"column-3": 50,
			"customBullet": ""
		    };
            
            if(event.action == "load"){
                
                point.customBullet = "icons/pause-icon.png";             
            }
            if(event.action == "play"){
                
                point.customBullet = "icons/play-icon.jpg"; 
            }
            
            var chart1 = chrome.app.window.get("controlPanel").contentWindow.chart1;
            
            chart1.dataProvider.push(point);
            chart1.validateNow(true, false);
            
        } else if(event.label == "light"){
            
            var chart2 = chrome.app.window.get("controlPanel").contentWindow.chart2;
            var date = dateFormatter(new Date(event.timestamp));

            chart2.dataProvider.push({
			"date": date,
			"column-1": event.intensity
            });
            
            chart2.validateNow(true, false);
            
        } else if(event.label == "music"){
            
            var chart2 = chrome.app.window.get("controlPanel").contentWindow.chart2;
            var date = dateFormatter(new Date(event.timestamp));
            
            chart2.dataProvider.push({
			"date": date,
			"column-2": event.intensity
            });
            
            chart2.validateNow(true, false);
        }
    }

//Metodi per gestione dei video
View.prototype.videoOnScreen = function ( videoPath ){
        
        //pulisco schermo prima mettere nuovo video
        $(".main-content").html("");
    
        //TODO fare CSS per video
        $(".main-content").append('<video id="video"><source src="'+videoPath+'" type="video/mp4"></video>');   
        $("#video").load();
    
}

View.prototype.playVideo = function() {  
    $("#video").load();
    $("#video").get(0).play();
}



//Metodi per la gestione della stanza
function startMusic( musicPath, musicIntensity ) {
    $(".main-content").html("");
    
    $(".main-content").append('<audio id="audio"><source src="'+musicPath+'" type="audio/mpeg"></audio>');
    $("#audio").volume = musicIntensity;
    $("#audio").get(0).play();
}

function changeMusicVolume(volume){
    if(volume == 0){
        volume = 0.0;
    } 
    $("#audio").get(0).play();
    $("#audio").get(0).volume = volume/100;
    
}

function stopMusic(){
    $("#audio").get(0).pause(); 
}

View.prototype.setLights = function( lightsColor, lightIntensity ){
    console.log("LIGHTS ON");
    
    /*var json = '{"Action":"EnvironmentAction", "Color":"' + lightsColor + '", "Luminosity":"' + lightIntensity + '"}';
    
    $.ajax({
        type: "POST",
        url: "localhost:5050",
        data: json,
        dataType: "json"
    });*/
}

function dateFormatter(date){
    
    var dat = new Date(date);
    
    var data = ""+dat.getFullYear()+"-";
    
    // MESI
    if((dat.getMonth()*1) <10 ){
        data += "0"+dat.getMonth()+"-";
    }else{
        data += dat.getMonth()+"-";
    }
    
    // GIORNI
    if((dat.getDate()*1) <10 ){
        data += "0"+dat.getDate()+" ";
    }else{
        data += dat.getDate()+" ";
    }
    
    //ORE
    if((dat.getHours()*1) <10 ){
        data += "0"+dat.getHours()+":";
    }else{
        data += dat.getHours()+":";
    }

    //MINUTI
    if((dat.getMinutes()*1) <10 ){
        data += "0"+dat.getMinutes()+":";
    }else{
        data += dat.getMinutes()+":";
    }
    
    //SECONDI
    if((dat.getSeconds()*1) <10 ){
        data += "0"+dat.getSeconds();
    }else{
        data += dat.getSeconds();
    }
    
    return data;
    
}


