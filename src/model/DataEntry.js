/* CLASS DATAENTRY */

//Constructor
function DataEntry(timestamp, attentionLevel, relaxationLevel) {
    
    this.timestamp = timestamp;
    this.attentionLevel = attentionLevel;
    this.relaxationLevel = relaxationLevel;
    
}

//Export class
module.exports = DataEntry;
