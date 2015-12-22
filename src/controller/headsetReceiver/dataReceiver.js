var events = require('events');
var packetEmitter = new events.EventEmitter();

exports.addNewListener = function(listener) {
    packetEmitter.addListener('newPacket',listener);
}

exports.listenerNumber = function() {
    var eventListeners = require('events').EventEmitter.listenerCount(packetEmitter,'newPacket');
    return eventListeners;
}


exports.startReceiving = function() {
    startConnection();


    console.log("Program Ended." )
}

function startConnection() {
    var dummy = require("../dummyServer");

    
    dummy.newListener(newPacket);
}

function newPacket(packet) {
    // Fire the connection event 
    packetEmitter.emit('newPacket',packet);
    console.log("New packet Emitted");

}
