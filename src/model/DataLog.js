/* CLASS LOG */

var DataEntry = require('../model/DataEntry');

//Constructor
function DataLog() {
    
    this.entries = [];
    this.timestamps = [];
    this.attentionLevels = [];
    this.relaxationLevels = [];
    this.JSONTimestamps = '"timestamps":"';
    this.JSONAttentionLevels = '"attentionLevels":"';
    this.JSONRelaxationLevels = '"relaxationLevels":"';
    
}

//Class methods
DataLog.prototype.addEntry = function(timestamp,attentionLevel, relaxationLevel) {
    
    var data = new DataEntry(timestamp,attentionLevel,relaxationLevel); 
    this.entries.push(data);   
    
};

DataLog.prototype.getEntries = function() {
    
    return this.entries;
    /*this.entries.forEach(function (eachEntry) {
         console.log(eachEntry);
    })*/
    
};

DataLog.prototype.getEntry = function() {
    
    return this.entries.pop();
    
};

/* Function to create the final JSON of all log entries for Abilia DB*/
DataLog.prototype.createJSON = function() {
    /*
    for (entry in this.entries) {
        this.timestamps.push(this.entries[entry].timestamp);
        this.attentionLevels.push(this.entries[entry].attentionLevel);
        this.relaxationLevels.push(this.entries[entry].relaxationLevel);
    }
    
    this.JSONTimestamps = this.JSONTimestamps + JSON.stringify(this.timestamps) +'"';
    this.JSONAttentionLevels = this.JSONAttentionLevels + JSON.stringify(this.attentionLevels) +'"';
    this.JSONRelaxationLevels = this.JSONRelaxationLevels + JSON.stringify(this.relaxationLevels) +'"';
    console.log(this.timestamps);
    return '{' + this.JSONTimestamps + ',' + this.JSONAttentionLevels + ',' + this.JSONRelaxationLevels +'}';*/
    return JSON.stringify(this.entries);
}

//Export class
module.exports = DataLog;

