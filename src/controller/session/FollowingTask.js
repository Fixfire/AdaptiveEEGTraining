var BOUND = 5;

var starter = require("./sessionStarter");
var events = require('events');
var packetEmitter;

var level;
var intensity;
var functionType;
var active;
var variable;
var time;
var action;
var lastIntensity;

function FollowingTask(){
    this.level = 100;
    this.active = false;
    this.time = 180;
    this.intensity = 100;
    this.functionType = "linear";
    this.variable = "attention";
    this.lastIntensity = 100;
    this.packetEmitter = new events.EventEmitter();
}

/* Function called when a new packet arrives */
FollowingTask.prototype.checkPacket = function(packet,object) {
    console.log("I'm following session and this is the packet ");
    console.log(packet);

    //Logging in cosole for checking
    console.log("target level : " + object.level);
    console.log("total time : " + object.time);
    console.log("final intensity : " + object.intensity);
    
    var currentVariable;
    
    if (object.variable == "attention") {
        currentVariable = packet.attention;
    } else {
        currentVariable = packet.meditation;
    }
    
    var currentIntensity;
    
    if(currentVariable > object.level){
        currentVariable = object.level;
    }
    
    //Following functions
    if (object.functionType == "quadratic") {
        
        currentIntensity = (object.intensity / object.level) * Math.pow(currentVariable,2) / 100;
        
    }  else if (object.functionType == "linear") {
        
        currentIntensity = ((object.intensity) / object.level )* currentVariable;   
        
        /*
        if (Math.abs(currentIntensity - object.lastIntensity)>object.BOUND){
            console.log('SONO DENTRO');
            if(currentIntensity - object.lastIntensity > 0){
                currentIntensity = object.lastIntensity + object.BOUND;
            }else{
                currentIntensity = object.lastIntensity - object.BOUND;
            }
        }*/
    }
    currentIntensity = 100 - currentIntensity;
    //object.lastIntensity = currentIntensity;
    
    changeIntensity(object, currentIntensity);
}

/* Start view's action */
function changeIntensity(object, intensity){
    console.log("Intensity is now : " + intensity);
    var timestamp = Date.now();
    object.action.timestamp = timestamp;
    object.action.intensity = intensity;
    starter.getView().followingActions(JSON.stringify(object.action),"continue");
    object.packetEmitter.emit("newAction",{label:object.action.label,timestamp:timestamp,intensity:intensity});
}

/* Init function to set starting intensity */
FollowingTask.prototype.startIntensity = function() {
    var timestamp = Date.now();
    this.action.timestamp = timestamp;
    this.action.intensity = 100;
    //console.log(this.action);
    starter.getView().followingActions(JSON.stringify(this.action),"play");
    this.packetEmitter.emit("newAction",{label:this.action.label,timestamp:timestamp,intensity:100});
    var object = this;
    setTimeout(function(){
        stopIntensity(object);
    }, 1000 * this.time);
}

/* Stopping following actions */
function stopIntensity(object) {
    var timestamp = Date.now();
    object.action.timestamp = timestamp;
    this.action.intensity = 0;
    starter.getView().followingActions(JSON.stringify(this.action),"stop");
    object.packetEmitter.emit("newAction",{label:object.action.label,timestamp:timestamp,intensity:0});
    starter.removeListener(object);
}


/* Getters & Setters */
FollowingTask.prototype.setIntensity = function(intensity){
    this.intensity = intensity;
}

FollowingTask.prototype.getIntensity = function(){
    return this.intensity;
}

FollowingTask.prototype.setFunctionType = function(type){
    this.functionType = type;
}

FollowingTask.prototype.getFunctionType = function(){
    return this.functionType;
}



FollowingTask.prototype.setVariable = function(variable){
    this.variable = variable;
}

FollowingTask.prototype.getVariable = function(){
    return this.variable;
}

FollowingTask.prototype.setLevel = function(level){
    this.level = level;
}

FollowingTask.prototype.getLevel = function(){
    return this.level;
}


FollowingTask.prototype.setTime = function(time){
    this.time = time;
}

FollowingTask.prototype.getTime = function(){
    return this.time;
}

FollowingTask.prototype.setAction = function(action){
    this.action = action;
}

FollowingTask.prototype.getAction = function(){
    return this.action;
}


module.exports = FollowingTask;