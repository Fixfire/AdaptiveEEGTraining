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
            my.headset.on("attention", function(data) {
                var packet = {
                    attention: data
                };
                self.emit("attention", JSON.stringify(packet));
            });

            my.headset.on("meditation", function(data) {
                var packet = {
                    meditation: data
                };
                self.emit("meditation", JSON.stringify(packet));
            });

            my.headset.on("eeg", function(data) {
                self.emit("eeg", JSON.stringify(data));
            });

            my.headset.on("wave", function(data) {
                var packet = {
                    wave: data
                };
                self.emit("wave", JSON.stringify(packet));
            });
        }
    });
}

util.inherits(AdaptiveEeg, EventEmitter);

AdaptiveEeg.prototype.init = function() {
    this.adapter.start();
};
