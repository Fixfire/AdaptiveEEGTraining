var DataLog = require('../model/DataLog');
var ActionLog = require('../model/ActionLog');
var dataLog = new DataLog();
var actionLog = new ActionLog();

var idTherapeuticCenter;
var idActivity;
var idChild;
var idTherapist;
var idParent;
var notes = "";
var rating = 5;
var dateStart;
var dateEnd;
var outcome = "positive";

/* Add packet to log when a new packet arrives */
exports.addPacket = 
    function addPacket(packet){
    
    dataLog.addEntry(packet.timestamp,packet.attention,packet.meditation);

}   

/* Add action to log when a new action is performed*/
exports.addAction = 
    function addAction(action){
    console.log("MANAGER:");
    console.log(action);
    actionLog.addEntry(action);

}   

/* Save log to storage */
exports.save = function(){
    console.log(JSON.parse(dataLog.createJSON()));
    console.log(JSON.parse(actionLog.createJSON()));
    console.log("Date start: " + dateStart);
    console.log("Date end: " + dateEnd);
    
    //TODO: Call Abilia DB
    /*
    var dbInitializer = '{"idTherapeuticCenter": "' + idTherapeuticCenter + '","idActivity": "'+ idActivity + '","idChild": "' + idChild + '","idTherapist": "' + idTherapist + '","idParent": "' + idParent + '","notes": "' + notes + '","rating": "' + rating + '","fieldList": {"timestamp":"DATETIME","attention": "INT(10)","relaxation": "INT(3)",“label”: “VARCHAR(32)”,"action": "VARCHAR(32)",“intensity”: “FLOAT”,“color”:”VARCHAR(32)”,“path”:”VARCHAR(100)”},"dateStart": "' + dateStart + '","dateEnd": "' + dateEnd + '","outcome": "' + outcome + '"}';
    
    $.ajax({
        type: "POST",
        url: "url",             <---- INSERIRE URL SERVER --->
        data: dbInitializer,
        dataType: "json",
        success: function() {
    
            var dataLogJSON = dataLog.createJSON();

            $.ajax({
                type: "POST",
                url: "url",             <---- INSERIRE URL SERVER --->
                data: dataLogJSON,
                dataType: "json"
            });

            var actionLogJSON = actionLog.createJSON();

            $.ajax({
                type: "POST",
                url: "url",             <---- INSERIRE URL SERVER --->
                data: actionLogJSON,
                dataType: "json"
            });
        1},
        error: function(request,error){
            console.log("Error");
        }
    });
    */

}

exports.setDateStart = function(date){
    dateStart = date;
}

exports.setDateEnd = function(date){
    dateEnd = date;
}

exports.initializeAbiliaDb = function(){
    /*$.ajax({
        type: "POST",
        url: "url",             <---- INSERIRE URL SERVER --->
        success: function(response){
             var parsedResponse = JSON.parse(response);
             idTherapeuticCenter = parsedResponse.idTherapeuticCenter;
             idActivity = parsedResponse.idActivity;
             idChild = parsedResponse.idChild;
             idTherapist = parsedResponse.idTherapist;
             idParent = parsedResponse.idParent;
         1},
         error: function(request,error){
              console.log("Error");
          }   
    });
*/
}