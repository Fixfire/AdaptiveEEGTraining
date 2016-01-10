//Section for dummy server
var events = require('events');
var packetEmitter = new events.EventEmitter();
var number = 0;

function Dummy() {
    
}


Dummy.prototype.on = function(event,listener) {
    console.log("ADDING NEW LISTENER");
    packetEmitter.addListener(event,listener);
}

Dummy.prototype.startDummy = function(){
    console.log("Starting dummy server");
    

    setInterval(function packetGenerator () {
        var dataPacket = require("./src/controller/headsetReceiver/dataPacket");

        var packet = dataPacket.randomPacketGenerator();

        console.log("emitting packet number " + number);
        packetEmitter.emit("packet",packet);

        number = number +1;

    }, 1000);

}

module.exports = Dummy