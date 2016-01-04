var level;
var time;
var actions;
var active;
var timeout; 

function AttentionTask(){
    this.level = 0;
    this.time = 0;
    this.actions = [];
    this.active = false;
}


AttentionTask.prototype.checkPacket = function(packet,object) {
    console.log("I'm attention session and this is the packet ");
    console.log(packet);

    //Logging in cosole for checking
    console.log("rule level : " + object.level);
    console.log("rule time : " + object.time);

    if(packet.attention >= object.level && !object.active){
        object.timeout = setTimeout(function() {startActions(object);}, 1000 * object.time);
        object.active = true;
    }
    if(packet.attention < object.level && object.active){
        object.timeout = clearTimeout();
        object.active = false;
    }
    
}


function startActions(object){
    var starter = require("./sessionStarter");
    
    for (action in object.actions){
        starter.getView().actions(JSON.stringify(object.actions[action]));
    }

    starter.removeListener(object);
    console.log("Action Started!");
}



AttentionTask.prototype.setLevel = function(level){
    this.level = level;
}

AttentionTask.prototype.getLevel = function(){
    return this.level;
}

AttentionTask.prototype.setTime = function(time){
    this.time = time;
}

AttentionTask.prototype.getTime = function(){
    return this.time;
}

AttentionTask.prototype.addAction = function(action){
    this.actions.push(action);
}

AttentionTask.prototype.getActions = function(){
    return this.actions;
}


module.exports = AttentionTask;