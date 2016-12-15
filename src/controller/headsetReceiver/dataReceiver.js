var events = require('events');
var packetEmitter = new events.EventEmitter();
var listeners = [] ;
var adapter;
var currentId = 0;


//Add new listener that waits for the end of the current task
exports.addNewSessionListener = function(element){;
    packetEmitter.addListener('endSession', element);
}

//Add a new listener for each rule in the current task.
exports.addNewTaskListener = function(element) {
    console.log("added new rule for the current task");
    listeners.push(element);
    element.setId(currentId);
    currentId++;
    packetEmitter.addListener(element.getId().toString(),element.checkPacket);
}

//Remove the listener from the curren task
exports.removeTaskListener = function(listener) {
    packetEmitter.removeAllListeners(listener.getId());
    listeners.splice(listeners.indexOf(listener),1);
    if (listeners.length == 0){
        packetEmitter.emit('endSession');
    }
}

//Add a generic listener that will receive the datapacket untill the end of the whole session.
exports.addNewListener = function(listener) {
    packetEmitter.addListener("jsonPacket",listener);
}

//connect to the headset middleware (or dummy server) in order to start receiving.
exports.startReceiving = function() {
    startConnection();
}

exports.stopReceiving = function() {
    stopConnection();
}

//Stop all the current rule for the current task.
exports.stopTasks = function(){
    if (listeners.length != 0){ 
        for (task in listeners){
            var target = parseInt(task);
            clearTimeout(listeners[task].getTimeout());
            packetEmitter.removeListener(listeners[task].getId().toString(),listeners[task].checkPacket);
        }
        packetEmitter.emit('endSession');
    }
}

exports.setAdapter = function(adapt) {
    adapter = adapt;
}

exports.getAdapter = function() {
    return this.adapter;
}

function startConnection() {
    adapter.on("packet",newPacket);
}

function stopConnection() {
    adapter.close();
}

// Function called when a new packet is received. It spread the packet to all the units that need it.
function newPacket(packet) {
    for (index in listeners) {
        packetEmitter.emit(listeners[index].getId().toString(),packet,listeners[index]);
    }
    packetEmitter.emit("jsonPacket",packet);
}
