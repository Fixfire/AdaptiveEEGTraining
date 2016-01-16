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
            //this.playVideo();
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
    //settings.final_volume = settings.intensity;
  
   if(label == "music"){         
        
        if(action == "play"){
            //startMusic(settings.path, settings.intensity);
        }
       
        if(action == "continue"){
            //changeMusicVolume(settings.intensity);
        }
        if(action == "stop"){
            //stopMusic();
        }
    }
    
    if(label == "light"){
        this.setLights(settings.color, settings.intensity);
    }
}


View.prototype.updateGraph = function( packet ) {
    chart1.dataProvider.push({
        "column-1": packet.attention,
        "column-2": packet.meditation,
        "date": new Date(packet.timestamp)
    });
    chart1.validateData();
}

View.prototype.updateActions = function( event ){
        
        if(event.label == "video"){
            
            var point = {
			"date": event.timestamp,
			"column-3": 0,
			"customBullet": ""
		    };
            
            if(event.action == "load"){
                
                point.customBullet = "icons/pause-icon.png";             }
            if(event.action == "play"){
                
                point.customBullet = "icons/play-icon.jpg"; 
            }
            
            chart1.dataProvider.push(point);
            chart1.validateData();
            
        } else if(event.label == "light"){

            chart2.dataProvider.push({
			"date": event.timestamp,
			"column-1": event.intensity
            });
            
            chart2.validateData();
            
        } else if(event.label == "music"){
            
            chart2.dataProvider.push({
			"date": event.timestamp,
			"column-2": event.intensity
            });
            
            chart2.validateData();
        }
    }

//Metodi per gestione dei video
View.prototype.videoOnScreen = function( videoPath ){
        
        //pulisco schermo prima mettere nuovo video
        $(".main-content").html("");
    
        //TODO fare CSS per video
        $(".main-content").append('<video id="video"><source src="'+videoPath+'" type="video/mp4"></video>');
        $("#video").load();
    
}

View.prototype.playVideo = function() {   
    $("#video").play();
}



//Metodi per la gestione della stanza
function startMusic( musicPath, musicIntensity ) {
    $(".main-content").html("");
    
    $(".main-content").append('<audio id="audio"><source src="'+musicPath+'" type="audio/mpeg"></audio>');
    $("#audio").volume = musicIntensity;
    $("#audio").play();
}

function changeMusicVolume(volume){
    $("#audio").volume = volume;
}

function stopMusic(){
    $("#audio").stop(); 
}

View.prototype.setLights = function( lightsColor, lightIntensity ){
    console.log("LIGHTS ON");
    
    /*var json = '{"Action":"EnvironmentAction", "Color":"'+lightsColor+'", "Luminosity":"'+lightIntensity+'"}';
    
    $.ajax({
        type: "POST",
        url: "url",             <---- INSERIRE URL SERVER --->
        data: json,
        dataType: "json"
    });*/
}




