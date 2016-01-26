function View() {}

module.exports = View;

var videoOn = false;
var musicOn = false;
var counter = 0;

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
            if(settings.path != undefined && settings.intensity != undefined){
                startMusic(settings.path, settings.intensity);
            }
        }
       
        if(action == "continue"){
            if(settings.intensity != undefined){
                changeMusicVolume(settings.intensity);
            }
        }
        if(action == "stop"){
            stopMusic();
        }
    }
    
    if(label == "light"){
        if(settings.color != undefined && settings.intensity != undefined){
            this.setLights(settings.color, settings.intensity, false);
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
        this.setLights(settings.color, settings.intensity, true);
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
        $("#video").on('ended',function(){
            console.log("Ending Video: " + videoOn);
            videoOn = false; 
        });
        $("#video").load();
    
}

View.prototype.playVideo = function() {  
    $("#video").load();
    $("#video").get(0).play();
    videoOn = true;
}

View.prototype.isVideoOn = function(){
    if($("#video").get(0) != undefined){
        console.log("isVideoOn? " + videoOn);
        return videoOn;
    }
}

View.prototype.isVideoPlayed = function(){
    if($("#video").get(0) != undefined){
        console.log("isVideo Played?" + !$("#video").get(0).played.length == 0);
        return !$("#video").get(0).played.length == 0; //false if video is not played
    }
    return false;
}

View.prototype.endVideo = function(){
    videoOn = false;
}

//Metodi per la gestione della stanza
function startMusic( musicPath, musicIntensity ) {
    $(".main-content").html("");
    
    $(".main-content").append('<audio id="audio"><source src="' + musicPath + '" type="audio/mpeg"></audio>');
    $("#audio").on('ended',function(){
        console.log("Ending Video: " + musicOn);
        musicOn = false; 
    });
    $("#audio").volume = musicIntensity;
    $("#audio").get(0).play();
    musicOn = true;
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
    musicOn = false;
}

View.prototype.isMusicOn = function() {
    if($("#audio").get(0) != undefined){
        console.log("isMusicOn? " + musicOn);
        return musicOn;
    }
}

View.prototype.isMusicPlayed = function() {
    if($("#audio").get(0) != undefined){
        console.log("isMusic Played?" + !$("#audio").get(0).paused);
        return !$("#audio").get(0).paused;
    }
    return false;
}

View.prototype.endMusic = function(){
    musicOn = false;
}

View.prototype.setLights = function( lightsColor, lightIntensity, isFollow ){
    if(counter < 2 && isFollow){
        counter++;
    } else {
        console.log("LIGHTS ON");
        counter = 0;
    
        var json = '{"Action":"EnvironmentAction", "Color":"' + lightsColor + '", "Brightness":"' + lightIntensity + '"}';

        $.ajax({
            type: "POST",
            url: "http://localhost:5050",
            data: json,
            dataType: "json"
        });
    }
    
}

View.prototype.alert = function(type){
    if(type == "newTask"){
        var opt = {
          type: "basic",
          title: "ALERT",
          message: "Task completed! A new task will start in 3 seconds",
          iconUrl: "../../alert.jpg"
        }

        chrome.notifications.create("string notificationId", opt);
    } else if (type == "endSession"){
        var opt = {
          type: "basic",
          title: "ALERT",
          message: "Session ended!",
          iconUrl: "../../alert.jpg"
        }

        chrome.notifications.create("string notificationId", opt);
    }
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




