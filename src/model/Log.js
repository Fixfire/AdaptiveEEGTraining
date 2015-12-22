/* CLASS LOG */

var DataEntry = require('../model/DataEntry');

//Constructor
function Log() {
    
    this.entries = [];
    
}

//Class methods
Log.prototype.addEntry = function(timestamp,attentionLevel, relaxationLevel) {
    
    var data = new DataEntry(timestamp,attentionLevel,relaxationLevel); 
    JSONentry = JSON.stringify(data);
    this.entries.push(JSONentry);   
    
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

