/**
 * Created by Alessandro on 28/12/15.
 */
"use strict";

var Cylon = require("cylon"),
    util = require('util'),
    EventEmitter = require('events').EventEmitter;

var AdaptiveEeg = module.exports = function AdaptiveEeg() {
    EventEmitter.call(this);
    this._events = ["attention", "meditation", "eeg", "wave"];
    self = this;
    this.adapter = Cylon.robot({

        connections: {
            neurosky: { adaptor: 'mindflex', port: '/dev/tty.Mindflex-DevB' }
        },

        devices: {
            headset: { driver: 'mindflex' }
        },

        work: function(my) {
            my.headset.on("packet", function(data) {
                process.emit("jsonPacket", JSON.stringify(data));
            });
        }
    });
}

util.inherits(AdaptiveEeg, EventEmitter);

AdaptiveEeg.prototype.init = function() {
    this.adapter.start();
};
