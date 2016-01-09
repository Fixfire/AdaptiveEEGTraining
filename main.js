var Adapter = require("./adapter.js");
var dataReceiver = require("./controller/headsetReceiver/dataReceiver.js")
var starter = require('./session/sessionStarter');

//choose between dummy or normal (yes/no)
var DUMMY = "yes"

var main = (function() {

    document.addEventListener('DOMContentLoaded', function() {
        
        
        var adapter = new Adapter();
        adapter.on("packet", function(data) {
            console.log(JSON.stringify(data));
        })
        adapter.init();
        
        if (DUMMY == "yes") {
            adapter = this;
            dataReceiver.setAdapter(adapter);
            startDummy();
        } else {
            dataReceiver.setAdapter(adapter);
        }
        
        starter.startNewSession();
        
    });

})();


//Section for dummy server
var events = require('events');
var packetEmitter = new events.EventEmitter();

exports.on = function(event,listener) {
    packetEmitter.addListener(event,listener);
}

function startDummy(){
    console.log("Starting dummy server");
    var number = 0;

    setInterval(function packetGenerator () {
        var dataPacket = require("./headsetReceiver/dataPacket");

        var packet = dataPacket.randomPacketGenerator();

        console.log("emitting packet number " + number);
        packetEmitter.emit("newPacket",packet);

        number = number +1;

    }, 1000);

}