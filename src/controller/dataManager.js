var Log = require('../model/Log');
var log = new Log();

exports.addPacket = 
    function addPacket(packet){
    
    log.addEntry(packet.getTimestamp(),packet.getAttention(),packet.getRelaxation());
    //log.addEntry('aaaa:mm:dd::hh:mm:ss',10,10);
    console.log(JSON.stringify(log.getEntries(),null,4));

}   