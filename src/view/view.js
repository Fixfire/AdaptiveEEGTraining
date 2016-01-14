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
    
    chrome.app.window.create('./src/view/control-panel.html', {
        id: 'controlPanel',
        outerBounds: {
            'width': 1280,
            'height': 1024
        }
    },
    function(createdWindow){
        
        //inizializzo il contenitore per il grafico
 $(chrome.app.window.get('controlPanel').contentWindow.document.getElementsByClassName("main-content")).append('<div id="container" style="width:100%; height:400px;"></div>');

       
console.log(chrome.app.window.get('controlPanel').contentWindow.document.getElementById("container"));
        $(chrome.app.window.get('controlPanel').contentWindow.document.getElementById("container")).highcharts({
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
            scrollbar: {
                enabled: true
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
                color: '#ffbf00'
            },
            {
                name: 'Rilassamento',
                color: '#00bfff'
            }]
        });
    });
}

View.prototype.updateGraph = function( packet ) {
        if(chrome.app.window.get('controlPanel')!=null){
            var graph = $(chrome.app.window.get('controlPanel').contentWindow.document.getElementById("#container")).highcharts();
            console.log(chrome.app.window.get('controlPanel').contentWindow.document);
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




