//var Log = require('../model/Log');
var log = new Log();

//exports.addPacket = 
    function addPacket(packet){
    
    log.addEntry(packet.getTimestamp(),packet.getAttention(),packet.getRelaxation());
    
    console.log(JSON.stringify(log.getEntries(),null,4));
    
}