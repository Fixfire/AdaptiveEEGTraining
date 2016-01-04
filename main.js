var Adapter = require("./adapter.js");

var main = (function() {

    document.addEventListener('DOMContentLoaded', function() {
        var adapter = new Adapter();
        adapter.init();
        process.on("packet", function(data) {
            console.log(data);
        })
    });

    })();