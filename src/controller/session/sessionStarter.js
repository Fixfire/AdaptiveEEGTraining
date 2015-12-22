exports.startNewConcentrationSession = function() {
    var receiver = require("../headsetReceiver/dataReceiver");
    var attentionTask = require("./attentionTask");
    var dataManager = require("../dataManager");

    receiver.addNewListener(attentionTask.checkPacket);
    receiver.addNewListener(dataManager.addPacket);
    
    receiver.startReceiving();
}


exports.startNewRelaxationSession = function() {
    
}