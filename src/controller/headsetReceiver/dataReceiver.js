var events = require('events');
var packetEmitter = new events.EventEmitter();
var currentTask = null;
var listeners = [] ;
var adapter;

var dataManager = require('../dataManager');

exports.addNewSessionListener = function(element){
    console.log("added new session for the current task");
    packetEmitter.addListener('endSession', element);
}

exports.addNewTaskListener = function(element) {
    console.log("added new rule for the current task");
    listeners.push(element);
    packetEmitter.addListener(listeners.length,element.checkPacket);
}

exports.removeTaskListener = function(listener) {
    packetEmitter.removeAllListeners(listeners.indexOf(listener) + 1 );
    listeners.splice(listeners.indexOf(listener),1);
    if (listeners.length == 0){
        packetEmitter.emit('endSession');
    }
}

exports.addNewListener = function(listener) {
    packetEmitter.addListener("jsonPacket",listener);
    //process.on('jsonPacket',listener);
}

exports.startReceiving = function() {
    currentTask = 0;
    startConnection();
}

exports.stopTasks = function(){
    for (task in listeners){
        var target = parseInt(task) + 1;
        clearTimeout(listeners[task].getTimeout());
        packetEmitter.removeListener(target,listeners[task].checkPacket);
    }
    packetEmitter.emit('endSession');
    //dataManager.save();
}

exports.setAdapter = function(adapt) {
    adapter = adapt;
}

exports.getAdapter = function() {
    return this.adapter;
}

function startConnection() {
    adapter.on("packet",newPacket);
    console.log(adapter);
}

function newPacket(packet) {
    // Fire the connection event 
    for (index in listeners) {
        var target = parseInt(index) + 1;
        packetEmitter.emit(target,packet,listeners[index]);
    }
    packetEmitter.emit("jsonPacket",packet);
    console.log("New packet Emitted");

}
