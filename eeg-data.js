"use strict";

var Cylon = require('cylon');
var straw = require('straw');

module.exports = straw.node({
  initialize: function (opts, done) {
    Cylon.robot({
      name: "NeuroBot",

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
          self.output(JSON.stringify(packet));
        });

        my.headset.on("meditation", function(data) {
          var packet = {
            meditation: data
          };
          self.output(JSON.stringify(packet));
        });

        my.headset.on("eeg", function(data) {
          self.output(JSON.stringify(data));
        });

        my.headset.on("wave", function(data) {
          var packet = {
            wave: data
          };
          self.output(JSON.stringify(packet));
        });
      }
    });
    done();
  },
  stop: function (done) {
    Cylon.stop();
    done();
  },
  start: function (done) {
    Cylon.start();
    done();
  }
});



