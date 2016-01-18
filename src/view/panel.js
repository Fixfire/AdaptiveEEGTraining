document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('form');

    // onClick's logic below:
    form.addEventListener('submit', function() {
        startApplication();
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
});
*/

function startApplication() {    
    var port = document.getElementById("port").value;
    var dummyBool = document.getElementById("dummyBool").checked;
    var JSONSession = document.getElementById("JSONSession").value;
        

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
    console.log(JSONSession);

    chrome.app.window.create('./src/view/index.html?port=' + port + '&dummy=' + dummyBool + '&JSONSession=' + JSONSession, {
        'outerBounds': {
            'width': 1280,
            'height': 1024
        }
    });

    chrome.app.window.create('./src/view/control-panel.html', {
        id: 'controlPanel',
        outerBounds: {
            'width': 1280,
            'height': 1024
        }
    });
}