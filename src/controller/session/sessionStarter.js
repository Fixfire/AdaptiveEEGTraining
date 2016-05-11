var receiver = require("../headsetReceiver/dataReceiver");
var CustomTask = require("./CustomTask");
var FollowingTask = require("./FollowingTask")
var dataManager = require("../dataManager");
var View = require("../../view/view.js");
    
var view;
var task = 0;
var JSONTask;
var timeout;
var checkInterval;

var JSONInitializer = '{"environment":"magicRoom"}';

exports.getView = function(){
    return view;
}

/* Function to start a new session */
exports.startNewSession = function(json) {

    //Instantiation of View
    view = new View();
    
    //Listeners adding
    receiver.addNewListener(view.updateGraph);
    receiver.addNewListener(dataManager.addPacket);
    receiver.addNewSessionListener(nextTask);
    
    JSONTask = JSON.parse(json);
    
    dataManager.initializeAbiliaDb();
    dataManager.setDateStart(Date.now());
    receiver.startReceiving();
    
    newTask(0);
 
}

/* Removes task from listeners list */
exports.removeListener = function(listener) {
    var receiver = require("../headsetReceiver/dataReceiver");
    receiver.removeTaskListener(listener);
}

/* Function to create a new tasks of the session */
function newTask(taskNumber){
    console.log(JSONTask);
    var JSONScene = JSONTask[taskNumber].main;
    var JSONOption = JSONTask[taskNumber].options;
    console.log(JSONOption);

    //Creation of new task for every event-condition
    for(event in JSONScene){
        
        if(JSONScene[event].type == "custom"){
            var task = new CustomTask();
            createCustomTask(JSONScene[event],task);
         } else if(JSONScene[event].type == "follow"){
            var task = new FollowingTask();
            createFollowingTask(JSONScene[event],task);
            task.startIntensity();
           }
        
        task.packetEmitter.on("newAction",dataManager.addAction);
        task.packetEmitter.on("newAction",view.updateActions);
        receiver.addNewTaskListener(task);

     }
    
    // Checking JSON task's option field
    if(JSONOption.timeout != '' && JSONOption.timeout != undefined){
        timeout = setTimeout(function(){timeoutActions();},JSONOption.timeout*1000);
      }else{
        timeout = setTimeout(function(){timeoutActions();}, 10*1000);
   }
    return task;
}

function timeoutActions(){
    if(!view.isVideoPlayed()){
        console.log("timout: " + view.isVideoPlayed())
        view.endVideo();
    }
    // Maybe this is useless, but it is necessary to stop correctly the music
    if (view.isMusicPlayed()){
        view.endMusic();
    }
    receiver.stopTasks();
}

/* Pass to the next task when all the previous task's event-conditions are finished and verify if the session is finished */
function nextTask(){
    clearTimeout(timeout);
    task = task + 1;
    if(task > JSONTask.length - 1){
        dataManager.setDateEnd(Date.now());
        view.alert("endSession");
        dataManager.save();
    } else {
        checkInterval = setInterval(function(){
            if (/*view.isMusicOn() ||*/ view.isVideoOn()){
                console.log("VIDEO or MUSIC ON");
            } else {
                clearInterval(checkInterval);
                view.alert("newTask");
                setTimeout(function() {
                    newTask(task);
                },3000);
            }
        },1000);
        
    }
}

/* Function to set parameters of a "custom" type task */
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

/* Function to set parameters of a "following" type task */
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