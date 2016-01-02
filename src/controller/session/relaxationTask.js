var level;
var time;
var actions;
var active;
var timeout; 

function RelaxationTask(){
    this.level = 0;
    this.time = 0;
    this.actions = [];
    this.active = false;
}


RelaxationTask.prototype.checkPacket = function(packet,object) {
    console.log("I'm attention session and this is the packet ");
    console.log(packet);

    //Logging in cosole for checking
    console.log("rule level : " + object.level);
    console.log("rule time : " + object.time);

    if(packet.attention >= object.level && !object.active){
        object.timeout = setTimeout(function() {startActions(object);},1000 * object.time);
        object.active = true;
    }
    if(packet.attention < object.level && object.active){
        object.timeout = clearTimeout();
        object.active = false;
    }
    
}


function startActions(){
    var starter = require("./sessionStarter");
    starter.removeListener(object);
    console.log("Action Started!");
}



RelaxationTask.prototype.setLevel = function(level){
    this.level = level;
}

RelaxationTask.prototype.getLevel = function(){
    return this.level;
}

RelaxationTask.prototype.setTime = function(time){
    this.time = time;
}

RelaxationTask.prototype.getTime = function(){
    return this.time;
}

RelaxationTask.prototype.addAction = function(action){
    this.actions.push(action);
}

RelaxationTask.prototype.getActions = function(){
    return this.actions;
}


module.exports = RelaxationTask;