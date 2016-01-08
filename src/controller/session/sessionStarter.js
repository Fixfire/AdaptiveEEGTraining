var view;

exports.getView = function(){
    return view;
}

exports.startNewSession = function() {
    var receiver = require("../headsetReceiver/dataReceiver");
    var CustomTask = require("./CustomTask");
    var FollowingTask = require("./FollowingTask")
    var dataManager = require("../dataManager");
    var View = require("../../view/view.js");
    
    var JSONInitializer = '{"environment":"magicRoom"}';
    
    //var JSONSession = '[{"main":[{"type":"custom","when":{"event":"attention","level":"50","time":"3","condition":"below"},"do":{"0":{"label":"video","action":"play"},"1":{"label":"light","action":"on"}}}],"options":{"device":"pc","timeout":"60"}},{"main":[{"type":"custom","when":{"event":"attention","level":"20","time":"1"},"do":{"0":{"label":"video","action":"play"},"1":{"label":"light","action":"on"}}}],"options":{"device":"pc","timeout":"3"}}]';
    
    var JSONSession = '[{"main":[{"type":"follow","when":{"event":"attention","level":"50","time"="5"},"do":{"0":{"label":"music","intensity":"100","responsive_function":"quadratic"}}}],"options":{"device":"pc"}}]';
        
    var taskNumber = 0;
    
    //Instantiation of View
    view = new View(JSONInitializer);
    receiver.addNewListener(view.updateGraph);
    
    var JSONTask = JSON.parse(JSONSession);
    console.log(JSONTask);
    
    for (task in JSONTask){
    
        var JSONScene = JSONTask[task].main;
        var JSONOption = JSONTask[task].options;
        console.log(JSONOption);

        receiver.addNewListener(dataManager.addPacket);

        for(event in JSONScene){
            
            if(JSONScene[event].type == "custom"){
                var task = new CustomTask();
                 createCustomTask(JSONScene[event],task);
            } else if(JSONScene[event].type == "follow"){
                var task = new FollowingTask();
                createFollowingTask(JSONScene[event],task);
                task.startIntensity();
            }

           
            receiver.addNewTaskListener(task);
            taskNumber = taskNumber + 1;

        }

       
       if(JSONOption.timeout != '' && JSONOption.timeout != undefined){
            setTimeout(receiver.stopTasks,JSONOption.timeout*1000);
        }else{
            setTimeout(receiver.stopTasks,10*1000);
        }
        
    }
    
    receiver.startReceiving();
    
}


exports.removeListener = function(listener) {
    var receiver = require("../headsetReceiver/dataReceiver");
    receiver.removeTaskListener(listener);
}

function createCustomTask(JSONTask, task){
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

function createFollowingTask(JSONTask, task){
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
    
    
    var JSONActions = JSONTask.do;
    
    for(action in JSONActions){
        console.log(JSONActions[action]);
        task.setFunctionType(JSONActions[action].responsive_function);
        task.setIntensity(JSONActions[action].intensity);
        task.setAction(JSONActions[action]);
    }
    console.log("FUNCTION IS "+task.getFunctionType());
    console.log("INTENSITY IS "+task.getIntensity());
    console.log("ACTION IS "+task.getAction());

}