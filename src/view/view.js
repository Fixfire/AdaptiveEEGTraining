var View = function () {
    //TODOda inserire le variabili 
    //ambiente, luci
}

View.prototype.startAttentionSession = function( firstVideo ){
    
    if(/*TODOcontrollo se è stanza*/){
        setRuntimeAttentionPanel();
        playVideoWithProjector( firstVideo );
    }
    else {
        playVideoOnBrowser( firstVideo );
    }
}

function setRuntimeAttentionPanel(/*parametri*/) {
    //TODO
}






View.prototype.startRelaxationSession = function( /*TODO parametri*/){
    
    if(/*TODOcontrollo se è stanza*/){
        this.setLights( color );
        startMusic();
        setRuntimeRelaxationPanel();
    }
    else {
        //TODO serve davvero l'if else? non c'è solo la stanza?
    }
}

function setRuntimeRelaxationPanel(/*parametri*/) {
    //TODO
}

function startMusic( music ) {
    //TODO
}







View.prototype.playVideo = function( video ) {
    
    if(/*TODOcontrollo se è stanza*/){
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
    //TODO
}







View.prototype.setLights = function( color ){
    //TODO chiamare SSex
}

View.prototype.changeLightsIntensity = function( intensity ){
    //TODO chiamare SSex
}