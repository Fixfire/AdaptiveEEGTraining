var level;
var time;
var actions;
var active;


function AttentionTask(){
    this.level = 0;
    this.time = 0;
    this.actions = [];
    this.active = false;
}




AttentionTask.prototype.checkPacket = function(packet) {
    console.log("I'm attention session and this is the packet ");
    console.log(packet);
    
    var timeout; 
    console.log(level);
    console.log(packet.attention);
    if(packet.attention >= level && !active){
        console.log("sei over 9000");
        timeout = setTimeout(startActions(),500 * time);
        active = true;
    }
    if(packet.attention < level && active){
        timeout = clearTimeout();
        active = false;
    }
    
}


function startActions(){
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