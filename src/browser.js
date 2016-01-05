require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/..\\..\\controller\\dummyServer.js":[function(require,module,exports){
var events = require('events');
var packetEmitter = new events.EventEmitter();

exports.newListener = function(listener) {
    packetEmitter.addListener('newPacket',listener);
}

console.log("Starting dummy server");

var starter = require('./session/sessionStarter');

starter.startNewConcentrationSession();

var number = 0;
    
setInterval(function packetGenerator () {
    var dataPacket = require("./headsetReceiver/dataPacket");

    var packet = dataPacket.randomPacketGenerator();
    
    console.log("emitting packet number " + number);
    packetEmitter.emit("newPacket",packet);
    
    number = number +1;

}, 1000);


},{"./headsetReceiver/dataPacket":2,"./session/sessionStarter":5,"events":8}],1:[function(require,module,exports){
var Log = require('../model/Log');
var log = new Log();

exports.addPacket = 
    function addPacket(packet){
    
    log.addEntry(packet.getTimestamp(),packet.getAttention(),packet.getRelaxation());
    //log.addEntry('aaaa:mm:dd::hh:mm:ss',10,10);
   // console.log(JSON.stringify(log.getEntries(),null,4));

}   
},{"../model/Log":7}],2:[function(require,module,exports){
// CLASS DATAPACKET //

/**
* Function for creating a packet object.
**/
function Packet(attention, meditation, loAlpha, hiAlpha, loBeta, hiBeta, loGamma, midGamma, theta , delta, timestamp) {
    this.attention = attention;
    this.meditation = meditation;
    this.loAlpha = loAlpha;
    this.hiAlpha = hiAlpha;
    this.loBeta = loBeta;
    this.hiBeta = hiBeta;
    this.loGamma = loGamma;
    this.midGamma = midGamma;
    this.theta = theta;
    this.delta = delta;
    this.timestamp = timestamp;
}

//Class methods

Packet.prototype.getTimestamp = function() {
    return this.timestamp;
}

Packet.prototype.getAttention = function() {
    return this.attention;
}

Packet.prototype.getRelaxation = function() {
    return this.relaxation;
}


/**
* Function for generating a random packet for an external module.
**/
Packet.randomPacketGenerator = function() {
    var attention = Math.floor((Math.random() * 100) + 1);
    var hiAlpha = Math.floor((Math.random() * 100) + 1);
    var loAlpha = Math.floor((Math.random() * 100) + 1);
    var loBeta = Math.floor((Math.random() * 100) + 1);
    var hiBeta = Math.floor((Math.random() * 100) + 1);
    var loGamma = Math.floor((Math.random() * 100) + 1);
    var midGamma = Math.floor((Math.random() * 100) + 1);
    var theta = Math.floor((Math.random() * 100) + 1);
    var delta = Math.floor((Math.random() * 100) + 1);
    var relaxation   = Math.floor((Math.random() * 100) + 1);
    var meditation = Math.floor((Math.random() * 100) + 1);
    var timestamp = new Date().getTime();
    return new Packet(attention, meditation, loAlpha, hiAlpha, loBeta, hiBeta, loGamma, midGamma, theta , delta, timestamp) ;
}

//Export class

module.exports = Packet

},{}],3:[function(require,module,exports){
var events = require('events');
var packetEmitter = new events.EventEmitter();
var currentTask = null;
var listeners = [] ;

exports.addNewTaskListener = function(element) {
    console.log("added new rule for the current task");
    listeners.push(element);
    packetEmitter.addListener(listeners.length,element.checkPacket);
}

exports.removeTaskListener = function(listener) {
    packetEmitter.removeAllListeners(listeners.indexOf(listener) + 1 );
}

exports.addNewListener = function(listener) {
    packetEmitter.addListener("jsonPacket",listener);
    //process.on('jsonPacket',listener);
}

exports.startReceiving = function() {
    currentTask = 0;
    startConnection();


    console.log("Program Ended." )
}

function startConnection() {
    
    //var adapter = new Adapter();
    //adapter.init();
    
    var dummy = require("../dummyServer");

    
    dummy.newListener(newPacket);
}

function newPacket(packet) {
    // Fire the connection event 
    for (index in listeners) {
        var target = parseInt(index) + 1;
        packetEmitter.emit(target,packet,listeners[index]);
    }
    packetEmitter.emit("jsonPacket",packet);
    console.log("New packet Emitted");

}

function nextSession(){
    currentTask++;
}

},{"../dummyServer":"/..\\..\\controller\\dummyServer.js","events":8}],4:[function(require,module,exports){
var level;
var time;
var actions;
var active;
var timeout;
var condition;

function AttentionTask(){
    this.level = 0;
    this.time = 0;
    this.actions = [];
    this.active = false;
    this.condition = "above";
}


AttentionTask.prototype.checkPacket = function(packet,object) {
    console.log("I'm attention session and this is the packet ");
    console.log(packet);

    //Logging in cosole for checking
    console.log("rule level : " + object.level);
    console.log("rule time : " + object.time);
    if (object.condition == "above") {
        
        if(packet.attention >= object.level && !object.active){
            object.timeout = setTimeout(function() {startActions(object);}, 1000 * object.time);
            object.active = true;
        }
        if(packet.relaxation < object.level && object.active){
            object.timeout = clearTimeout();
            object.active = false;
        }
    }
    
    if (object.condition == "below") {
        if(packet.attention <= object.level && !object.active){
            object.timeout = setTimeout(function() {startActions(object);}, 1000 * object.time);
            object.active = true;
        }
        if(packet.attention > object.level && object.active){
            object.timeout = clearTimeout();
            object.active = false;
        }
    } 

    
}


function startActions(object){
    var starter = require("./sessionStarter");
    console.log("Action Started!");
    
    for (action in object.actions){
        starter.getView().actions(JSON.stringify(object.actions[action]));
    }

    starter.removeListener(object);

}



AttentionTask.prototype.setLevel = function(level){
    this.level = level;
}

AttentionTask.prototype.getLevel = function(){
    return this.level;
}

AttentionTask.prototype.setCondition = function(condition){
    this.condition = condition;
}

AttentionTask.prototype.getCondition = function(){
    return this.condition;
}

AttentionTask.prototype.setTime = function(time){
    this.time = time;
}

AttentionTask.prototype.getTime = function(){
    return this.time;
}

AttentionTask.prototype.addAction = function(action){
    this.actions.push(action);
}

AttentionTask.prototype.getActions = function(){
    return this.actions;
}


module.exports = AttentionTask;
},{"./sessionStarter":5}],5:[function(require,module,exports){
var view;

exports.getView = function(){
    return view;
}

exports.startNewConcentrationSession = function() {
    var receiver = require("../headsetReceiver/dataReceiver");
    var AttentionTask = require("./AttentionTask");
    var dataManager = require("../dataManager");
    var View = require("../../view/view.js");
    
    var JSONInitializer = '{"environment":"pc"}';
    
    var JSONSession = '[{"main":{"0":{"when":{"event":"attention","level":"50","time":"3","condition":"below"},"do":{"0":{"label":"video","action":"play"},"1":{"label":"hue","action":"on"}}}},"options":{"device":"pc","timeout":"60"}},{"main":{"0":{"when":{"event":"attention","level":"20","time":"1"},"do":{"0":{"label":"video","action":"play"},"1":{"label":"hue","action":"on"}}}},"options":{"device":"pc","timeout":"60"}}]';
        
    var taskNumber = 0;
    
    //Instantiation of View
    view = new View(JSONInitializer);
    receiver.addNewListener(view.updateGraph);
    
    var JSONTask = JSON.parse(JSONSession);
    console.log(JSONTask);
    
    for (task in JSONTask){
    
        var JSONScene = JSONTask[task].main;

        receiver.addNewListener(dataManager.addPacket);

        for(event in JSONScene){

            var attentionTask = new AttentionTask();

            createTask(JSONScene[event],attentionTask);
            receiver.addNewTaskListener(attentionTask);
            
            taskNumber = taskNumber + 1;

        }

    }
    
    receiver.startReceiving();
}

exports.startNewRelaxationSession = function() {
    
}


exports.removeListener = function(listener) {
    var receiver = require("../headsetReceiver/dataReceiver");
    receiver.removeTaskListener(listener);
}

function createTask(JSONTask, task){
    var time = JSONTask.when.time;
    if(time != '' && time != undefined){
        task.setTime(time);
    }
    console.log("TIME IS: " + task.getTime());
    
    var level = JSONTask.when.level;
    if(level != '' && level != undefined){
        task.setLevel(level);
    } 
    console.log("LEVEL IS: " + task.getLevel());
    
    var condition = JSONTask.when.condition;
    if(condition != '' && condition != undefined){
        task.setCondition(condition);
    }
    console.log("CONDITION IS: " + task.getCondition());
    
    var JSONActions = JSONTask.do;
    
    for(action in JSONActions){
        console.log(JSONActions[action]);
        task.addAction(JSONActions[action]);
    }
    
    console.log("ACTIONS ARE "+task.getActions());

}
},{"../../view/view.js":9,"../dataManager":1,"../headsetReceiver/dataReceiver":3,"./AttentionTask":4}],6:[function(require,module,exports){
/* CLASS DATAENTRY */

//Constructor
function DataEntry(timestamp, attentionLevel, relaxationLevel) {
    
    this.timestamp = timestamp;
    this.attentionLevel = attentionLevel;
    this.relaxationLevel = relaxationLevel;
    
}

//Export class
module.exports = DataEntry;

},{}],7:[function(require,module,exports){
/* CLASS LOG */

var DataEntry = require('../model/DataEntry');

//Constructor
function Log() {
    
    this.entries = [];
    
}

//Class methods
Log.prototype.addEntry = function(timestamp,attentionLevel, relaxationLevel) {
    
    var data = new DataEntry(timestamp,attentionLevel,relaxationLevel); 
    this.entries.push(data);   
    
};

Log.prototype.getEntries = function() {
    
    return this.entries;
    /*this.entries.forEach(function (eachEntry) {
         console.log(eachEntry);
    })*/
    
};

Log.prototype.getEntry = function() {
    
    return this.entries.pop();
    
};

//Export class
module.exports = Log;


},{"../model/DataEntry":6}],8:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      }
      throw TypeError('Uncaught, unspecified "error" event.');
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],9:[function(require,module,exports){
function View( JSONInitializer ) {
    
    /* mi aspetto che JSONInitializer sia
     * fatto così: 
     * {"environment":"magicRoom/valore-per-indicare-altro","lights":"array-di-tutte-le-luci/null"}
    */
    var settings = JSON.parse(JSONInitializer);
    
    this.environment = settings.environment;

    if(this.environment == "magicRoom"){
        this.lights = settings.lights;
        setPanel();
    }
    
}

module.exports = View;

//TODO da fare lo stop del video e la fine della sessione

//Distinzione tra azioni
View.prototype.actions = function( JSONaction ){
    
    var settings = JSON.parse(JSONaction);
    
    var label = settings.label;
    
    if(label == "video"){
        
        var action = settings.action;
        
        if(action == "load"){
            this.videoOnScreen(JSONaction);
        }
        if(action == "play"){
            console.log("PLAY VIDEO!");
            this.playVideo();
        }
    }
    
   if(label == "music"){         
        
        var action = settings.action;
        
        if(action == "play"){
            startMusic(JSONaction);
        }
        if(action == "continue"){
            changeMusicVolume(settings.final_volume, settings.responsive_function);
        }
        if(action == "stop"){
            stopMusic();
        }
    }
    
    if(action == "light"){
        this.setLights(JSONaction);
    }
}



//Metodi per inizializzazione e update pannello di controllo
function setPanel() {
    
    //inizializzo il contenitore per il grafico
    $(".main-content").append('<div id="container" style="width:100%; height:400px;"></div>');
    
    $('#container').highcharts({
        chart: {
            type: 'scatter',
            margin: [50, 50, 60, 80],
        },
        title: {
            text: ''
        },
        legend: {
            enabled: true,
            floating: true,
            verticalAlign: 'bottom',
            layout: 'vertical', 
            align: 'center',
            y: 25
        },
        xAxis: {
            gridLineWidth: 1,
            minPadding: 0.2,
            maxPadding: 0.2,
            min: 0,
            floor: 0,
            tickInterval: 2
        },
        yAxis: {
            gridLineWidth: 1,
            floor: 0,
            min: 0,
            ceiling: 100,
            max: 100,
            title: {
                text: 'Valore'
            },
            minPadding: 0.2,
            maxPadding: 0.2,
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        exporting: {
            enabled: false
        },
        plotOptions: {
            area: {
                pointStart: 0,
                marker: {
                    enabled: true
                },
            },
            series: {
                lineWidth: 1
            }
        },
        series: [{
            name: 'Attenzione',
            data: [[20, 20], [30, 30]],
            color: '#ffbf00'
        },
        {
            name: 'Rilassamento',
            data: [[25, 56], [56, 37]],
            color: '#00bfff'
        }]
    });
    
}

View.prototype.updateGraph = function( packet ) {
    
    //controllo che il container esista e quindi ci sia il pannello 
    if($("#container").length){
              
        var graph = $("#container").highcharts();
        
        graph.series[0].addPoint([packet.timestamp, packet.attention], true);
        graph.series[1].addPoint([packet.timestamp, packet.meditation], true);
    }
}



//Metodi per gestione dei video
View.prototype.videoOnScreen = function( videoJSON ){
    
    if(this.environment == "magicRoom"){
        videoOnScreenWithProjector( videoJSON );
    }
    else {
        
        var video = JSON.parse(videoJSON);
        videoOnScreenOnBrowser( video.path );
    }
}

function videoOnScreenWithProjector( videoJSON ) {
    //TODO 
}

function videoOnScreenOnBrowser( video ) {
    
    //pulisco schermo prima mettere nuovo video
    $(".main-content").html("");
    
    //TODO fare CSS per video
    $(".main-content").append('<video><source src="'+video+'" type="video/mp4"></video>');
    $("#video").load();

}

View.prototype.playVideo = function() {
    
    if(this.environment == "magicRoom"){
        playVideoWithProjector();
    }
    else {
        playVideoOnBrowser();
    }
}

function playVideoWithProjector(){
    //TODO chiamare SSex
}

function playVideoOnBrowser(){
    $("#video").play();
}



//Metodi per la gestione della stanza
function startMusic( musicJSON ) {
    //TODO chiamare SSex
}

function changeMusicVolume(finalVolume, responsive_function){
    //TODO chiamare SSex
}

function stopMusic(){
    //TODO chiamare SSex 
}

View.prototype.setLights = function( lightsJSON ){
    //TODO chiamare SSex
}





},{}]},{},[]);
