var events = require('events');
var packetEmitter = new events.EventEmitter();
var currentTask = null;

exports.addNewListener = function(listener,task) {
    packetEmitter.addListener("Task"+task,listener);
}

exports.addNewListener = function(listener) {
    packetEmitter.addListener("newPacket",listener);
}

exports.startReceiving = function() {
    currentTask = 0;
    startConnection();


    console.log("Program Ended." )
}

function startConnection() {
    var dummy = require("../dummyServer");

    
    dummy.newListener(newPacket);
}

function newPacket(packet) {
    // Fire the connection event 
    packetEmitter.emit("task"+currentTask,packet);
    packetEmitter.emit("newPacket",packet);
    console.log("New packet Emitted");

}

function nextSession(){
    currentTask++;
}
