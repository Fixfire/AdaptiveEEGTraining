var Adapter = require("./adapter.js");
var dataReceiver = require("./src/controller/headsetReceiver/dataReceiver");
var starter = require('./src/controller/session/sessionStarter');
var Dummy = require("./Dummy.js")
var json;
var main = (function() {

    document.addEventListener('DOMContentLoaded', function() {
        var dummy = getUrlVars()["dummy"];
        var port = getUrlVars()["port"];
        var json = require("./JSON.json")
        
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
    });
})();

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
    vars[key] = value;
    });
    return vars;
}




