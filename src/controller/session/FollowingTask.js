var starter = require("./sessionStarter");
var events = require('events');
var Controller = require('node-pid-controller');
var packetEmitter;

var level;
var intensity;
var functionType;
var active;
var variable;
var time;
var action;
var timestamp;
var id;
var currentIntensity;

/**
* Class for handling the following task.
**/
function FollowingTask(){
    this.level = 100;
    this.active = false;
    this.time = 180;
    this.intensity = 100;
    this.functionType = "linear";
    this.variable = "attention";
    this.packetEmitter = new events.EventEmitter();
    this.ctr = new Controller(0.25,0.01,0.01);
    console.log(this.ctr);
}

/* Function called when a new packet arrives */
FollowingTask.prototype.checkPacket = function(packet,object) {
    console.log("I'm following session and this is the packet ");
    console.log(packet);

    object.timestamp = packet.timestamp;

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
    

    
    if(currentVariable > object.level){
        currentVariable = object.level;
    }
    
    //Following functions
    if (object.functionType == "quadratic") {
        
        object.currentIntensity = (object.intensity / object.level) * Math.pow(currentVariable,2) / 100;
         
    }  else if (object.functionType == "linear") {
        
        object.currentIntensity = ((object.intensity) / object.level )* currentVariable;   
     
    } else if (object.functionType == "pid") {
        if(object.currentIntensity == null){
            object.currentIntensity = 100;   
        }
        console.log("CurrentVariable" + currentVariable);
        object.ctr.setTarget(((object.intensity) / object.level )*currentVariable);
        object.currentIntensity = object.currentIntensity + object.ctr.update(object.currentIntensity);
    }
   object.currentIntensity = 100 - object.currentIntensity;

    changeIntensity(object, object.currentIntensity);
}

/* Start view's action */
function changeIntensity(object, intensity){
    console.log("Intensity is now : " + intensity);
    object.action.timestamp = object.timestamp;
    object.action.intensity = intensity;
    object.packetEmitter.emit("newAction",{label:object.action.label,timestamp:object.action.timestamp,intensity:intensity});
    starter.getView().followingActions(JSON.stringify(object.action),"continue");
}

/* Init function to set starting intensity */
FollowingTask.prototype.startIntensity = function() {
    this.action.timestamp = timestamp;
    this.action.intensity = 100;
    starter.getView().followingActions(JSON.stringify(this.action),"play");
    var object = this;
    setTimeout(function(){
        stopIntensity(object);
    }, 1000 * this.time);
}

/* Stopping following actions */
function stopIntensity(object) {
    object.action.timestamp = object.timestamp;
    object.action.intensity = 0;
    console.log("Intensity is now : " + object.action.intensity);
    object.packetEmitter.emit("newAction",{label:object.action.label,timestamp:object.action.timestamp,intensity:0});
    starter.getView().followingActions(JSON.stringify(object.action),"stop");
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


FollowingTask.prototype.getId = function(){
    return this.id;
}

FollowingTask.prototype.setId = function(id){
    this.id = id;
}


FollowingTask.prototype.getTimeout = function(){}


module.exports = FollowingTask;