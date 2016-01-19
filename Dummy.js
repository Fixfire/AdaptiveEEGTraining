//Section for dummy server
var number = 0;
var EventEmitter = require('events').EventEmitter;
var util = require('util');

util.inherits(Dummy, EventEmitter);
module.exports = Dummy

function Dummy() {
    
}

//Init function for starting sending random packet every 1 secons
Dummy.prototype.init = function() {
    console.log("Starting dummy server");
    var object = this;
    setInterval(function packetGenerator () {
        var dataPacket = require("./src/controller/headsetReceiver/dataPacket");

        var packet = dataPacket.randomPacketGenerator();

        console.log("emitting packet number " + number);
        object.emit("packet",packet);

        number = number +1;

    }, 1000);
}

