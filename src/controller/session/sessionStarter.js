var view;

exports.getView = function(){
    return view;
}

exports.startNewSession = function() {
    var receiver = require("../headsetReceiver/dataReceiver");
    var CustomTask = require("./CustomTask");
    var dataManager = require("../dataManager");
    var View = require("../../view/view.js");
    
    var JSONInitializer = '{"environment":"pc"}';
    
    var JSONSession = '[{"main":{"0":{"type":"custom","when":{"event":"attention","level":"50","time":"3","condition":"below"},"do":{"0":{"label":"video","action":"play"},"1":{"label":"hue","action":"on"}}}},"options":{"device":"pc","timeout":"60"}},{"main":{"0":{"type":"custom","when":{"event":"attention","level":"20","time":"1"},"do":{"0":{"label":"video","action":"play"},"1":{"label":"hue","action":"on"}}}},"options":{"device":"pc","timeout":"60"}}]';
        
    var taskNumber = 0;
    
    //Instantiation of View
    view = new View(JSONInitializer);
    receiver.addNewListener(view.updateGraph);
    
    var JSONTask = JSON.parse(JSONSession);
    console.log(JSONTask);
    
    for (task in JSONTask){
    
        var JSONScene = JSONTask[task].main;

        receiver.addNewListener(dataManager.addPacket);

        for(event in JSONScene){
            
            if(JSONScene[event].type == "custom"){
                var task = new CustomTask();
            } else if(JSONScene[event].type == "follow"){
                var task = new FollowTask();
            }

            createTask(JSONScene[event],task);
            receiver.addNewTaskListener(task);
            
            taskNumber = taskNumber + 1;

        }

    }
    
    receiver.startReceiving();
}


exports.removeListener = function(listener) {
    var receiver = require("../headsetReceiver/dataReceiver");
    receiver.removeTaskListener(listener);
}

function createTask(JSONTask, task){
    var variable = JSONTask.when.event;
    if(variable != '' && variable != undefined){
        task.setVariable(variable);
    }
    console.log("VARIABLE IS: " + task.getVariable());
    
    
    var time = JSONTask.when.time;
    if(time != '' && time != undefined){
        task.setTime(time);
    }
    console.log("TIME IS: " + task.getTime());
    
    var level = JSONTask.when.level;
    if(level != '' && level != undefined){
        task.setLevel(level);
    } 
    console.log("LEVEL IS: " + task.getLevel());
    
    var condition = JSONTask.when.condition;
    if(condition != '' && condition != undefined){
        task.setCondition(condition);
    }
    console.log("CONDITION IS: " + task.getCondition());
    
    var JSONActions = JSONTask.do;
    
    for(action in JSONActions){
        console.log(JSONActions[action]);
        task.addAction(JSONActions[action]);
    }
    
    console.log("ACTIONS ARE "+task.getActions());

}