var Log = require('../model/Log');
var log = new Log();

/* Add packet to log when a new packet arrives */
exports.addPacket = 
    function addPacket(packet){
    
    log.addEntry(packet.timestamp,packet.attention,packet.meditation);

}   

/* Save log to storage */
exports.save = function(){
    console.log(JSON.parse(log.createJSON()));
    //TODO: Call Abilia DB
}