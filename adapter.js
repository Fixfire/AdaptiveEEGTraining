/**
 * Created by Alessandro on 28/12/15.
 */
var port;


var Cylon = require("cylon"),
    util = require('util'),
    EventEmitter = require('events').EventEmitter;

var Adapter = module.exports = function Adapter(port) {;
    this.port = port;
    EventEmitter.call(this);
    this._events = ["jsonRawPacket", "jsonComputedPacket"];
    self = this;
}

util.inherits(Adapter, EventEmitter);

Adapter.prototype.eegDevice = Cylon.robot({
    connections: {
        neurosky: { adaptor: 'mindflex', port: '/dev/tty.Mindflex-DevB' }
    },
    devices: {
        headset: { driver: 'mindflex' }
    },
    work: function(my) {
        my.headset.on("allComputedPacket", function(data) {
            self.emit("packet", data);
        });
    }
});

Adapter.prototype.isInit = false;

Adapter.prototype.init = function() {
    if (!this.isInit) {
        console.log(this.port);
        console.log("porto la port");
        this.eegDevice.start();
        this.isInit = true;
    }
}
