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


//Metodi di startup per le sessioni
View.prototype.startAttentionSession = function( firstVideo ){
    
    if(this.environment == "magicRoom"){
        setRuntimeAttentionPanel();
    }
    
    this.videoOnScreen( firstVideo );
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
function updateAttentionPanel(/*parametri*/){
    //TODO faccio una cartella con le icone degli animali che devono matchare i nomi dati ai video
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
    
    //TODO suppongo che la variabile video sia solo il nome dell'animale e non anche il formato
    var videoName = video + ".mp4";
    
    //pulisco schermo prima mettere nuovo video
    $(".main-content").html("");
    
    //TODO fare CSS per video
    $(".main-content").append('<video><source src="'+videoName+'" type="video/mp4"></video>');
    $("#video").load();

}

View.prototype.playVideo = function( video ) {
    
    if(this.environment == "magicRoom"){
        playVideoWithProjector( video );
    }
    else {
        playVideoOnBrowser( video );
    }
}

function playVideoWithProjector( video ){
    //TODO chiamare SSex
}

function playVideoOnBrowser( video ){
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














$(document).ready( function(){
    
    var a = $("#video").length;

$(".main-content").append(typeof $("#video"));
    
});