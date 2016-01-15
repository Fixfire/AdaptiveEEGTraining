function View() {
    
    //inizializzo per settarla in setPanel
    this.setPanel();
    
}

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

View.prototype.followingActions = function(JSONaction,action,intensity) {
    
    var settings = JSON.parse(JSONaction);
    
    var label = settings.label;
    
    settings.final_volume = intensity;
  
   if(label == "music"){         
        
        if(action == "play"){
            startMusic(settings.path, intensity);
        }
       
        if(action == "continue"){
            changeMusicVolume(intensity);
        }
        if(action == "stop"){
            stopMusic();
        }
    }
    
    if(label == "light"){
        this.setLights(settings.color, intensity, settings.position);
    }
}



//Metodi per inizializzazione e update pannello di controllo
View.prototype.setPanel = function(callback) {
    
    
}

View.prototype.updateGraph = function( packet ) {
   
    if(chrome.app.window.get('controlPanel') != undefined){   
        var graph = chrome.app.window.get('controlPanel').contentWindow.Highcharts.charts[0];
        var date = new Date(packet.timestamp);
        var timestamp = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ':' + date.getMilliseconds();
        var slide = false;

        if(graph.series[0].data.length > 30){
            slide = true;
        }

        graph.series[0].addPoint([timestamp, packet.attention], true, slide);
        graph.series[1].addPoint([timestamp, packet.meditation], true, slide);
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




