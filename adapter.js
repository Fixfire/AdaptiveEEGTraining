/**
 * Created by Alessandro on 28/12/15.
 */

var Cylon = require("cylon"),
    util = require('util'),
    EventEmitter = require('events').EventEmitter;

var Adapter = module.exports = function Adapter(port) {
    this.port = port;
    EventEmitter.call(this);
    self = this;
    this.robot = Cylon.robot({
    connections: {
        neurosky: { adaptor: 'mindflex', port: self.port }
    },
    devices: {
        headset: { driver: 'mindflex' }
    },
    work: function(my) {
        my.headset.on("allComputedPacket", function(data) {
          if (data.hasOwnProperty("signal")) {
            if (data.signal === 0) {
              self.emit("packet", data);
            } else {
              self.emit("lowSignalPacket");
            }
          }
        });
    }
	});
}

util.inherits(Adapter, EventEmitter);

Adapter.prototype.isInit = false;

Adapter.prototype.init = function() {
    if (!this.isInit) {
        this.robot.start();
        this.isInit = true;
    }
}
