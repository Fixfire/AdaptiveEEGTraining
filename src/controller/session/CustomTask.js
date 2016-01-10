var level;
var time;
var actions;
var active;
var timeout;
var condition;
var variable;

function CustomTask(){
    this.level = 0;
    this.time = 0;
    this.actions = [];
    this.active = false;
    this.condition = "above";
    this.variable = "attention";
}


CustomTask.prototype.checkPacket = function(packet,object) {
    console.log("I'm attention session and this is the packet ");
    console.log(packet);

    //Logging in cosole for checking
    console.log("rule level : " + object.level);
    console.log("rule time : " + object.time);
    
    var currentVariable;
    
    if (object.variable == "attention") {
        currentVariable = packet.attention;
    } else {
        currentVariable = packet.meditation;
    }
    
    if (object.condition == "above") {
        
        if(currentVariable >= object.level && !object.active){
            object.timeout = setTimeout(function() {startActions(object);}, 1000 * object.time);
            object.active = true;
        }
        if(currentVariable < object.level && object.active){
            object.timeout = clearTimeout();
            object.active = false;
        }
    } else if (object.condition == "below") {
        if(currentVariable <= object.level && !object.active){
            object.timeout = setTimeout(function() {startActions(object);}, 1000 * object.time);
            object.active = true;
        }
        if(currentVariable > object.level && object.active){
            object.timeout = clearTimeout();
            object.active = false;
        }
    }
    
}


function startActions(object){
    var starter = require("./sessionStarter");
    console.log("Action Started!");
    
    for (action in object.actions){
        starter.getView().actions(JSON.stringify(object.actions[action]));
    }

    starter.removeListener(object);

}


CustomTask.prototype.setVariable = function(variable){
    this.variable = variable;
}

CustomTask.prototype.getVariable = function(){
    return this.variable;
}

CustomTask.prototype.setLevel = function(level){
    this.level = level;
}

CustomTask.prototype.getLevel = function(){
    return this.level;
}

CustomTask.prototype.setCondition = function(condition){
    this.condition = condition;
}

CustomTask.prototype.getCondition = function(){
    return this.condition;
}

CustomTask.prototype.setTime = function(time){
    this.time = time;
}

CustomTask.prototype.getTime = function(){
    return this.time;
}

CustomTask.prototype.addAction = function(action){
    this.actions.push(action);
}

CustomTask.prototype.getActions = function(){
    return this.actions;
}


module.exports = CustomTask;