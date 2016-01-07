var Adapter = require("./adapter.js");
var Server = require("./src/controller/dummyServer.js");

var main = (function() {

    document.addEventListener('DOMContentLoaded', function() {
        
        var adapter = new Adapter();
        adapter.on("packet", function(data) {
            console.log(JSON.stringify(data));
        })
        adapter.init();
        Server.start();
    });

})();