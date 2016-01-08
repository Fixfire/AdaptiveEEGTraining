var level;
var intesity;
var functionType;
var active;
var variable;
var time;
var action;

function FollowingTask(){
    this.level = 0;
    this.active = false;
    this.time = 180;
    this.intesity = 100;
    this.functionType = "linear";
    this.variable = "attention";
}


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
    
    var currentIntesity;
    
    if (object.functionType == "quadratic") {
        currentIntesity = (object.intensity * packet.currentVariable) / (object.level * object.level);
    }  else if (object.functionType == "linear") {
        currentIntesity = (object.intensity * packet.currentVariable) / object.level;    
    }
    
    changeIntensity(object, intesity);
}


function changeIntensity(object, intesity){
    var starter = require("./sessionStarter");
    console.log("Intensity is now : " + intesity);
    starter.getView().followingActions(JSON.stringify(object.action),"continue",object.intensity);
}

FollowingTask.prototype.startIntensity() {
    starter.getView().followingActions(JSON.stringify(this.action),"play",100);
    setTimeout(this.stopIntensity, 1000 * object.time);
}


FollowingTask.prototype.stopIntensity() {
    starter.getView().followingActions(JSON.stringify(this.action),"stop",0);
    starter.removeListener(this);
}



FollowingTask.prototype.setIntensity = function(intensity){
    this.intesity = intensity;
}

FollowingTask.prototype.getIntesity = function(){
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

CustomTask.prototype.setAction = function(action){
    this.action;
}

CustomTask.prototype.getAction = function(){
    return this.action;
}


module.exports = FollowingTask;