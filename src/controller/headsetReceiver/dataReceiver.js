var events = require('events');
var packetEmitter = new events.EventEmitter();
var currentTask = null;
var listeners = [] ;

exports.addNewTaskListener = function(element) {
    console.log("added new rule for the current task");
    listeners.push(element);
    packetEmitter.addListener(listeners.length,element.checkPacket);
}

exports.removeTaskListener = function(listener) {
    packetEmitter.removeAllListeners(listeners.indexOf(listener) + 1 );
}

exports.addNewListener = function(listener) {
    packetEmitter.addListener("jsonPacket",listener);
    //process.on('jsonPacket',listener);
}

exports.startReceiving = function() {
    currentTask = 0;
    startConnection();


    console.log("Program Ended." )
}

exports.stopTasks = function(){
    for (task in listeners){
        var target = parseInt(task) + 1;
        packetEmitter.removeListener(target,listeners[task].checkPacket);
    }
}

function startConnection() {
    //var Adapter = require(...)
    //var adapter = new Adapter();
    //adapter.init();
    //adapter.on('packet',newPacket);
    
    var dummy = require("../dummyServer");

    
    dummy.newListener(newPacket);
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

function nextSession(){
    currentTask++;
}
