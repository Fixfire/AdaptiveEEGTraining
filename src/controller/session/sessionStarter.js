exports.startNewConcentrationSession = function() {
    var receiver = require("../headsetReceiver/dataReceiver");
    var AttentionTask = require("./AttentionTask");
    var dataManager = require("../dataManager");
    
    var JSONSession = '[{"main":{"0":{"when":{"event":"attention","level":"50","time":"1"},"do":{"0":{"label":"video","action":"play"},"1":{"label":"hue","action":"on"}}}},"options":{"device":"pc","timeout":"60"}},{"main":{"0":{"when":{"event":"attention","level":"30","time":"2"},"do":{"0":{"label":"video","action":"play"},"1":{"label":"hue","action":"on"}}}},"options":{"device":"pc","timeout":"60"}}]';
        
    var taskNumber = 0;
    
    var JSONTask = JSON.parse(JSONSession);
    console.log(JSONTask);
    
    for (task in JSONTask){
    
        var JSONScene = JSONTask[task].main;

        receiver.addNewListener(dataManager.addPacket);

        for(event in JSONScene){

            var attentionTask = new AttentionTask();

            createTask(JSONScene[event],attentionTask);
            receiver.addNewTaskListener(attentionTask.checkPacket,attentionTask);
            
            taskNumber = taskNumber + 1;

        }

    }
    
    receiver.startReceiving();
    
    
    
}


exports.startNewRelaxationSession = function() {
    
}

function createTask(JSONTask, task){
    var time = JSONTask.when.time;
    if(time != ''){
        task.setTime(time);
    }
    console.log("TIME IS: " + task.getTime());
    
    var level = JSONTask.when.level;
     if(level != ''){
        task.setLevel(level);
    }
    console.log("LEVEL IS: " + task.getLevel());
    
    var JSONActions = JSONTask.do;
    
    for(action in JSONActions){
        console.log(JSONActions[action]);
        task.addAction(JSONActions[action]);
    }
    
    console.log("ACTIONS ARE "+task.getActions());

}