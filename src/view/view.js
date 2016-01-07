function View( JSONInitializer ) {
    
    /* mi aspetto che JSONInitializer sia
     * fatto così: 
     * {"environment":"magicRoom/valore-per-indicare-altro","lights":"array-di-tutte-le-luci/null"}
    */
    var settings = JSON.parse(JSONInitializer);
    
    this.environment = settings.environment;

    if(this.environment == "magicRoom"){
        this.lights = settings.lights;
        setPanel();
    }
    
}

module.exports = View;

//TODO da fare lo stop del video e la fine della sessione

//Distinzione tra azioni
View.prototype.actions = function( JSONaction ){
    
    var settings = JSON.parse(JSONaction);
    
    var label = settings.label;
    
    if(label == "video"){
        
        var action = settings.action;
        
        if(action == "load"){
            this.videoOnScreen(JSONaction);
        }
        if(action == "play"){
            console.log("PLAY VIDEO!");
            this.playVideo();
        }
    }
    
   if(label == "music"){         
        
        var action = settings.action;
        
        if(action == "play"){
            startMusic(JSONaction);
        }
        if(action == "continue"){
            changeMusicVolume(settings.final_volume, settings.responsive_function);
        }
        if(action == "stop"){
            stopMusic();
        }
    }
    
    if(action == "light"){
        this.setLights(JSONaction);
    }
}



//Metodi per inizializzazione e update pannello di controllo
function setPanel() {
    
    //inizializzo il contenitore per il grafico
    $(".main-content").append('<div id="container" style="width:100%; height:400px;"></div>');
    
    $('#container').highcharts({
        chart: {
            type: 'scatter',
            margin: [50, 50, 60, 80],
        },
        title: {
            text: ''
        },
        legend: {
            enabled: true,
            floating: true,
            verticalAlign: 'bottom',
            layout: 'vertical', 
            align: 'center',
            y: 25
        },
        xAxis: {
            gridLineWidth: 1,
            minPadding: 0.2,
            maxPadding: 0.2,
            min: 0,
            floor: 0,
            tickInterval: 2
        },
        yAxis: {
            gridLineWidth: 1,
            floor: 0,
            min: 0,
            ceiling: 100,
            max: 100,
            title: {
                text: 'Valore'
            },
            minPadding: 0.2,
            maxPadding: 0.2,
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        exporting: {
            enabled: false
        },
        plotOptions: {
            area: {
                pointStart: 0,
                marker: {
                    enabled: true
                },
            },
            series: {
                lineWidth: 1
            }
        },
        series: [{
            name: 'Attenzione',
            data: [[20, 20], [30, 30]],
            color: '#ffbf00'
        },
        {
            name: 'Rilassamento',
            data: [[25, 56], [56, 37]],
            color: '#00bfff'
        }]
    });
    
}

View.prototype.updateGraph = function( packet ) {
    
    //controllo che il container esista e quindi ci sia il pannello 
    if($("#container").length){
              
        var graph = $("#container").highcharts();
        
        graph.series[0].addPoint([packet.timestamp, packet.attention], true);
        graph.series[1].addPoint([packet.timestamp, packet.meditation], true);
    }
}



//Metodi per gestione dei video
View.prototype.videoOnScreen = function( videoJSON ){
    
    if(this.environment == "magicRoom"){
        videoOnScreenWithProjector( videoJSON );
    }
    else {
        
        var video = JSON.parse(videoJSON);
        videoOnScreenOnBrowser( video.path );
    }
}

function videoOnScreenWithProjector( videoJSON ) {
    //TODO 
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
function startMusic( musicJSON ) {
    //TODO chiamare SSex
}

function changeMusicVolume(finalVolume, responsive_function){
    //TODO chiamare SSex
}

function stopMusic(){
    //TODO chiamare SSex 
}

View.prototype.setLights = function( lightsJSON ){
    //TODO chiamare SSex
}




