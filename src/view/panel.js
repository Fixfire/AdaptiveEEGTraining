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
            for (port in portList) {
                var path = String(port.path);
                console.log(path);  
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
});

function startApplication() {    
    var port = document.getElementById("port").value;
    var dummyBool = document.getElementById("dummyBool").checked;
        

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


    chrome.app.window.create('./src/view/index.html?port=' + port + '&dummy=' + dummyBool, {
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