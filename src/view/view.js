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
   
    if(chrome.app.window.get('controlPanel') != undefined){   
        var graph = chrome.app.window.get('controlPanel').contentWindow.Highcharts.charts[0];

        graph.series[0].addPoint([packet.timestamp, packet.attention], true);
        graph.series[1].addPoint([packet.timestamp, packet.meditation], true);
        graph.series[2].addPoint([packet.timestamp,0], true);
    }
}

View.prototype.updateActions = function( event ){
    
    if(chrome.app.window.get('controlPanel') != undefined){
        var graph = chrome.app.window.get('controlPanel').contentWindow.Highcharts.charts[0];
        
        if(event.label == "video"){
                    
            var pointToAdd = {x:event.timestamp, 
                              y:50,
                              marker: {
                                symbol:null,
                                width:25,
                                height:25
                             }
            };
            
            if(event.action == "load"){
                pointToAdd.marker.symbol = 'url(./icons/pause-icon.png)';
            }
            if(event.action == "play"){
                pointToAdd.marker.symbol = 'url(./icons/play-icon.jpg)';
            }
            
            graph.series[2].addPoint(pointToAdd, true);
        } else if(event.label == "light"){
            graph.series[3].addPoint([event.timestamp, event.intensity], true);
        } else if(event.label == "music"){
            graph.series[4].addPoint([event.timestamp, event.intensity], true);
        }
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




