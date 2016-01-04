function View( JSONInitializer ) {
    
    /* mi aspetto che JSONInitializer sia
     * fatto così: 
     * {"environment":"magicRoom/valore-per-indicare-altro","lights":"array-di-tutte-le-luci/null"}
    */
    var settings = JSON.parse(JSONInitializer);
    
    this.environment = settings.environment;

    if(this.environment == "magicRoom"){
        this.lights = settings.lights;
    }
    
}

module.exports = View;



//Distinzione tra azioni
View.prototype.actions = function( JSONaction ){
    
    var settings = JSON.parse(JSONaction);
    
    var label = settings.label;
    
    if(label == "video"){
        
        var action = settings.action;
        
        if(action == "load"){
            this.videoOnScreen(settings.path);
        }
        if(action == "play"){
            this.playVideo();
        }
    }
    
   if(label == "music"){         
        
        var action = settings.action;
        
        if(action == "play"){
            startMusic(settings.path);
        }
        if(action == "continue"){
            changeMusicVolume(settings.final_volume, settings.responsive_function);
        }
        if(action == "stop"){
            stopMusic();
        }
    }
    
    if(action == "light"){
        this.setLights( settings.color, settings.final_brightness, settings.position);
    }
}



//Metodo di startup per le sessioni
View.prototype.startSession = function(){
    
    if(this.environment == "magicRoom"){
        setPanel();
    }

}



//Metodi per inizializzazione e update pannello di controllo
function setPanel(/*TODO parametri*/) {
    
    //inizializzo i contenitori per i due grafici
    $(".main-content").append('<div id="container1" style="width:100%; height:400px;"></div><div id="container2" style="width:100%; height:400px;"></div>');
}

View.prototype.updateGraph = function( packet ) {
    if($(/*TODO id del contenitore del grafico*/).length){
        //TODO update graph
    }
}




//Metodi per gestione dei video
View.prototype.videoOnScreen = function( video ){
    
    if(this.environment == "magicRoom"){
        videoOnScreenWithProjector( video );
        updateAttentionPanel(/*parametri*/);
    }
    else {
        videoOnScreenOnBrowser( video );
    }
}

function videoOnScreenWithProjector( video ) {
    //TODO fare il JSON con comando per la stanza di fare il load del video
}

function videoOnScreenOnBrowser( video ) {
    
    //pulisco schermo prima mettere nuovo video
    $(".main-content").html("");
    
    //TODO fare CSS per video
    $(".main-content").append('<video><source src="'+video+'" type="video/mp4"></video>');
    $("#video").load();

}

View.prototype.playVideo = function() {
    
    if(this.environment == "magicRoom"){
        playVideoWithProjector();
    }
    else {
        playVideoOnBrowser();
    }
}

function playVideoWithProjector(){
    //TODO chiamare SSex
}

function playVideoOnBrowser(){
    $("#video").play();
}



//Metodi per la gestione della stanza
function startMusic( music ) {
    //TODO chiamare SSex
}

function changeMusicVolume(finalVolume, responsive_function){
    //TODO chiamare SSex
}

function stopMusic(){
    //TODO chiamare SSex 
}

View.prototype.setLights = function( color, intensity, position ){
    //TODO chiamare SSex
}




