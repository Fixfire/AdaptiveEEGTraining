var events = require('events');
var packetEmitter = new events.EventEmitter();

exports.newListener = function(listener) {
    packetEmitter.addListener('newPacket',listener);
}

console.log("Starting dummy server");

var starter = require('./session/sessionStarter');

starter.startNewConcentrationSession();

var number = 0;
    
setInterval(function packetGenerator () {
    var dataPacket = require("./headsetReceiver/dataPacket");

    var packet = dataPacket.randomPacketGenerator();
    
    console.log("emitting packet number " + number);
    packetEmitter.emit("newPacket",packet);
    
    number = number +1;

}, 1000);

console.log("timeout started"); 
