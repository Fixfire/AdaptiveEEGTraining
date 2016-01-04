var View = function ( JSONInitializer ) {
    
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
        if(typeOfAction == "play"){
            this.playVideo();
        }
    }
/*    if(label == "music"){               TODO sistemare su skype
        
        var action = settings.action;
        
        if(action == "play"){
            //TODO
        }
        if(action == "play"){
            //TODO
        }
    }
    if(action == "light"){
    //TODO
    }*/
}


//Metodi di startup per le sessioni
View.prototype.startAttentionSession = function(){
    
    if(this.environment == "magicRoom"){
        setRuntimeAttentionPanel();
    }

}

View.prototype.startRelaxationSession = function( /*TODO parametri*/){
    
    if(this.environment == "magicRoom"){
        this.setLights( color );
        startMusic();
        setRuntimeRelaxationPanel();
    }
    else {
        //TODO serve davvero l'if else? non c'è solo la stanza?
    }
}



//Metodi di settaggio per i pannelli di controllo
function setRuntimeAttentionPanel() {
    //TODO 
}

function setRuntimeRelaxationPanel(/*parametri*/) {
    //TODO
}



//Metodi di aggiornamento dei pannelli di controllo
function updateAnimalAttentionPanel(/*parametri*/){
    //TODO faccio una cartella con le icone degli animali che devono matchare i nomi dati ai video
}

View.prototype.updateGraph = function( packet ) {
    //TODO 
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
    //TODO
}

View.prototype.setLights = function( color ){
    //TODO chiamare SSex
}

View.prototype.changeLightsIntensity = function( intensity ){
    //TODO chiamare SSex
}



