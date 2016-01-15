
document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('form');
    // onClick's logic below:
    link.addEventListener('submit', function() {
        createCustomTastk();
    });
});



function createCustomTastk() {    
    var port = document.getElementById("port").value;
    var path = document.getElementById("path").value;
    var dummyBool = document.getElementById("dummyBool");
    

    chrome.app.window.create('./src/view/index.html?port=' + port + '&path=' + path + '&dummy=' + dummyBool.checked, {
        'outerBounds': {
            'width': 1280,
            'height': 1024
        }
    });

    
}