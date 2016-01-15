var DataLog = require('../model/DataLog');
var ActionLog = require('../model/ActionLog');
var dataLog = new DataLog();
var actionLog = new ActionLog();

/* Add packet to log when a new packet arrives */
exports.addPacket = 
    function addPacket(packet){
    
    dataLog.addEntry(packet.timestamp,packet.attention,packet.meditation);

}   

/* Add action to log when a new action is performed*/
exports.addAction = 
    function addAction(action){
    console.log("MANAGER:");
    console.log(action);
    actionLog.addEntry(action);

}   

/* Save log to storage */
exports.save = function(){
    console.log(JSON.parse(dataLog.createJSON()));
    console.log(JSON.parse(actionLog.createJSON()));
    //TODO: Call Abilia DB
}