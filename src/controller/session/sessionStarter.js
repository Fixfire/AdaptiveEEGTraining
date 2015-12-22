exports.startNewConcentrationSession = function() {
    var receiver = require("../headsetReceiver/dataReceiver");
    var attentionTask = require("./attentionTask");

    receiver.addNewListener(attentionTask.checkPacket);
    receiver.startReceiving();
}


exports.startNewRelaxationSession = function() {
    
}