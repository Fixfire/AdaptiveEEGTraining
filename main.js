var Adapter = require("./adapter.js");
var dataReceiver = require("./src/controller/headsetReceiver/dataReceiver");
var starter = require('./src/controller/session/sessionStarter');
var Dummy = require("./Dummy.js")
var json;
var main = (function() {

    document.addEventListener('DOMContentLoaded', function() {
        var dummy = getUrlVars()["dummy"];
        var port = getUrlVars()["port"];
        var session = getUrlVars()["JSONSession"];
        //TODO var json = require("./" + session + ".json");
        var json = require("./JSON.json");
var port ;
var dummyBool;

document.addEventListener('DOMContentLoaded', function() {
    $('#form').submit(function () {
     startApplication();
     return false;
    });
        
        if (dummy == "true") {
            adapter = new Dummy();
            dataReceiver.setAdapter(adapter);
            adapter.startDummy();
            starter.startNewSession(JSON.stringify(json));
        } else {  
            var adapter = new Adapter(port);
			adapter.once("packet", function(data) {
				starter.startNewSession(JSON.stringify(json));
			})
            dataReceiver.setAdapter(adapter);
            adapter.init();
        } 
    $('#JSONSession').on('change', function(session) {
        var reader = new FileReader();
       
        //Read file inserted 
        reader.onload = function(event) {
            json = event.target.result;

            //Check if the file inserted is a valid JSON format
            try {
                json = JSON.parse(json); 
            } catch (err) {
                var opt = {        
                    type: "basic",
                    title: "ALERT",
                    message: "This is not a well formed JSON file. Error" + err  + " detected",
                    iconUrl: "../../alert.jpg"
                }

                chrome.notifications.create("string notificationId",opt);
                json = undefined;
                return;
            }
       
        };
        reader.readAsText(session.target.files[0]);
    });
    
    $('#portListButton').on('click', function setPortList(callback) {
        var list = document.getElementById('portListDropdown');
        chrome.serial.getDevices(function(portList) {
            console.log(portList);
            for (var entry = 0; entry < portList.length; entry++) {
                var path = String(portList[entry].path);
                var li = document.createElement("li");
                var link = document.createElement("a");             
                var text = document.createTextNode(path);
                link.appendChild(text);
                link.href = "#";
                li.appendChild(link);
                list.appendChild(li);
            }
        });
    });
 
/* WIP copy selected to entry text field
    $('.portListEntry').on('click', function setPortList(callback) {
        console.log("clicked on " + this.text());
        var port = document.getElementById('port');
        var path = this.text();
        port.val(path);
        
    });
    */
});

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
    vars[key] = value;


//Check input and start the application.
function startApplication() {
    
    //chechk if JSON was inserted or loaded.
    if (json == undefined){
        var opt = {        
            type: "basic",
            title: "ALERT",
            message: "JSON is not inserted\wait for json to reload",
            iconUrl: "../../alert.jpg"
        }

        chrome.notifications.create("string notificationId",opt);
        return;
    }
    
    port = document.getElementById("port").value;
    dummyBool = document.getElementById("dummyBool").checked;
    
    //Check if port is inserted with dummy disabled.
    if(dummyBool == false) {
        if (port == ''){
            var opt = {        
                type: "basic",
                title: "ALERT",
                message: "port is not defined for not dummy applcation!",
                iconUrl: "../../alert.jpg"
            }

            chrome.notifications.create("string notificationId",opt);
            return;
        }      
    }
    
    $('#controlPanel').hide();
    chrome.app.window.create('./src/view/control-panel.html', {
        id: 'controlPanel',
        outerBounds: {
            'width': 1280,
            'height': 1024
        }
    });
    return vars;
  
}
}





