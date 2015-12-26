"use strict";

var Cylon = require('cylon');

Cylon.robot({
  name: "NeuroBot",

  connections: {
    neurosky: { adaptor: 'mindflex', port: '/dev/tty.Mindflex-DevB' }
  },

  devices: {
    headset: { driver: 'mindflex' }
  },

  work: function(my) {
    my.headset.on('attention', function(data) {
      console.log("attention:" + data);
    });

    my.headset.on('meditation', function(data) {
      console.log("meditation:" + data);
    });

    my.headset.on("eeg", function(data) {
      console.log("EEG:", data);
    });

    my.headset.on("wave", function(data) {
      console.log("Wave:", data);
    });

    my.headset.on("bad_packet", function(data) {
      console.log("Bad packet:", data);
      });

    my.headset.on("mode_1", function() {
      console.log("MODE 1 found");
    });
  }
}).start();

