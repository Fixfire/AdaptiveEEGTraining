//var Log = require('../model/Log');
var log = new Log();

//exports.addPacket = 
    function addPacket(packet){
    
    log.addEntry(packet.getTimestamp(),packet.getAttention(),packet.getRelaxation());
    
    console.log(JSON.stringify(log.getEntries(),null,4));

}

/* CLASS LOG */

//Constructor
function Log() {
    
    this.entries = [];
    
}

//Class methods
Log.prototype.addEntry = function(timestamp,attentionLevel, relaxationLevel) {
    
    var data = new DataEntry(timestamp,attentionLevel,relaxationLevel); 
    //JSONentry = JSON.stringify(data);
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

/* CLASS DATAENTRY */

//Constructor
function DataEntry(timestamp, attentionLevel, relaxationLevel) {
    
    this.timestamp = timestamp;
    this.attentionLevel = attentionLevel;
    this.relaxationLevel = relaxationLevel;
    
}