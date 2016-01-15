/* CLASS LOG */

//Constructor
function ActionLog() {
    
    this.entries = [];
    this.timestamps = [];
    this.attentionLevels = [];
    this.relaxationLevels = [];
    this.JSONActions = '"actions":"';
    this.JSONAttentionLevels = '"attentionLevels":"';
    this.JSONRelaxationLevels = '"relaxationLevels":"';
    
}

//Class methods
ActionLog.prototype.addEntry = function(action) {
    console.log('pushing action:');
    console.log(action);
    this.entries.push(action);   
    
};

ActionLog.prototype.getEntries = function() {
    
    return this.entries;
    
};

ActionLog.prototype.getEntry = function() {
    
    return this.entries.pop();
    
};

/* Function to create the final JSON of all log entries for Abilia DB*/
ActionLog.prototype.createJSON = function() {
    return JSON.stringify(this.entries);
}

//Export class
module.exports = ActionLog;

