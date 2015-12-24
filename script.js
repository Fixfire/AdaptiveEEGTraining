"use strict";

var Cylon = require('cylon');

Cylon.robot({
  name: "NeuroBot",

  connections: {
    neurosky: { adaptor: 'neurosky', port: '/dev/tty.Mindflex-DevB' }
  },

  devices: {
    headset: { driver: 'neurosky' }
  },

  work: function(my) {
    my.headset.on('attention', function(data) {
      console.log("attention:" + data);
    });

    my.headset.on('meditation', function(data) {
      console.log("meditation:" + data);
    });

    every((2).seconds(), function() {
      console.log("Hi, my name is " + my.name)
    });
  }
})

Cylon.start();
