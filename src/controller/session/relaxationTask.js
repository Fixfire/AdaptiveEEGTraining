var level;
var time;
var actions;
var active;
var timeout; 
var condition;

function RelaxationTask(){
    this.level = 0;
    this.time = 0;
    this.actions = [];
    this.active = false;
    this.condition = "above";
}


RelaxationTask.prototype.checkPacket = function(packet,object) {
    console.log("I'm relaxation session and this is the packet ");
    console.log(packet);

     //Logging in cosole for checking
    console.log("rule level : " + object.level);
    console.log("rule time : " + object.time);
    if (object.condition == "above") {
        
        if(packet.relaxation >= object.level && !object.active){
            object.timeout = setTimeout(function() {startActions(packet,object);}, 1000 * object.time);
            object.active = true;
        }
        if(packet.relaxation < object.level && object.active){
            object.timeout = clearTimeout();
            object.active = false;
        }
    } else if (object.condition == "below") {
        if(packet.relaxation <= object.level && !object.active){
            object.timeout = setTimeout(function() {startActions(packet,object);}, 1000 * object.time);
            object.active = true;
        }
        if(packet.relaxation > object.level && object.active){
            object.timeout = clearTimeout();
            object.active = false;
        }
    }
    
}


function startActions(){
     var starter = require("./sessionStarter");
    console.log("Action Started!");
    
    for (action in object.actions){
        starter.getView().actions(packet,JSON.stringify(object.actions[action]));
    }

    //starter.removeListener(object);
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