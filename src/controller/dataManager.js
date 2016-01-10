var Log = require('../model/Log');
var log = new Log();

exports.addPacket = 
    function addPacket(packet){
    
    log.addEntry(packet.getTimestamp(),packet.getAttention(),packet.getMeditation());
    //log.addEntry('aaaa:mm:dd::hh:mm:ss',10,10);
   //console.log(JSON.stringify(log.getEntries(),null,4));
    

}   

exports.save = function(){
    log.createJSON();
    console.log(log.JSONTimestamps);
    console.log(log.JSONAttentionLevels);
    console.log(log.JSONRelaxationLevels);
}