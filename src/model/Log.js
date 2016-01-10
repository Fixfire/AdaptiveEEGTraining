/* CLASS LOG */

var DataEntry = require('../model/DataEntry');

//Constructor
function Log() {
    
    this.entries = [];
    this.timestamps = [];
    this.attentionLevels = [];
    this.relaxationLevels = [];
    this.JSONTimestamps = '"timestamps":"';
    this.JSONAttentionLevels = '"attentionLevels":"';
    this.JSONRelaxationLevels = '"relaxationLevels":"';
    
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

Log.prototype.createJSON = function() {
    
    for (entry in this.entries) {
        this.timestamps.push(this.entries[entry].timestamp);
        this.attentionLevels.push(this.entries[entry].attentionLevel);
        this.relaxationLevels.push(this.entries[entry].relaxationLevel);
    }
    
    this.JSONTimestamps = this.JSONTimestamps + JSON.stringify(this.timestamps) +'"';
    this.JSONAttentionLevels = this.JSONAttentionLevels + JSON.stringify(this.attentionLevels) +'"';
    this.JSONRelaxationLevels = this.JSONRelaxationLevels + JSON.stringify(this.relaxationLevels) +'"';

}

//Export class
module.exports = Log;

