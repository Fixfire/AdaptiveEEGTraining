var Adapter = require("./adapter.js");
var dataReceiver = require("./src/controller/headsetReceiver/dataReceiver");
var starter = require('./src/controller/session/sessionStarter');
var Dummy = require("./Dummy.js")

//choose between dummy or normal (yes/no)
var DUMMY = "yes";

var main = (function() {

    document.addEventListener('DOMContentLoaded', function() {
        
        
        if (DUMMY == "yes") {
            adapter = new Dummy();
            dataReceiver.setAdapter(adapter);
            adapter.startDummy();
        } else {
                
            var adapter = new Adapter();
            adapter.on("packet", function(data) {
                console.log(JSON.stringify(data));
            })
            dataReceiver.setAdapter(adapter);
            adapter.init();
        }
        
        starter.startNewSession();
        
    });

})();




