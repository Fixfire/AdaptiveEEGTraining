function startExtension() {
    var JSON = localStorage.getItem("JSON");
    if (JSON != null) {
        JSON = '[' + JSON + ']';
    } else {
        return;   
    }
    window.location.replace("chrome-extension://pmmcijoeiccgcemdionefkdbipgckldi/window.html?JSON=" + JSON);
}



function show() {
    var JSON = localStorage.getItem("JSON");
    if (JSON != null) {
        JSON = JSON.split(',');
        document.querySelector('.results').innerHTML = "there are some task saved. Click cancel to cancel them.";
    } else {
         document.querySelector('.results').innerHTML = "no task saved";
    }
}


function clearTask() {
    localStorage.removeItem("JSON");
    window.location.replace("index.html");
}


function redirectCustom(){
    window.location.replace("input.html");
}

function createCustomTastk() {
    var jsonArray = localStorage.getItem("JSON");
    
    var time = document.getElementById("timeValue").value;
    var level = document.getElementById("levelValue").value;
    var timeoutValue = document.getElementById("timeoutValue").value;
    var timeoutBool = document.getElementById("timeoutBool");
    var condition = document.getElementsByName('condition');
    var label = document.getElementsByName('label');
    var action = document.getElementById("action").value;
    
    if (time < 0) {
        time = 0;
    }
    
    if (level < 0) {
        level = 0;
    }
    if (label[0].checked) {
        label = label[0].value;
    } else {
        label = label[1].value;
    }
    
     if (condition[0].checked) {
        condition = condition[0].value;
    } else {
        condition = condition[1].value;
    }
    
    if (timeoutBool.checked == "true") {
        timeoutValue = ',"timeout":"10"';
    } else {
        timeoutValue = '';
    }
    
    var actions;
    
    if (action == "lights") {
        actions = '{"label":"light","action":"on"}';
    } 
    
    if (action == "video") {
        actions = '{"label":"video","action":"play"}';
    }

    var JSON = '{"main":[{"type":"custom","when":{"event":"' + label + '","level":"' + level + '","time":"' + time + '","condition":"' + condition + '"},"do":{"0":' + actions +'}}],"options":{"device":"pc"'+ timeoutValue +'}}'
  
    if (jsonArray == null) {
        jsonArray = JSON;
    } else {
        jsonArray = jsonArray + ',' + JSON;
    }
    
    localStorage.setItem("JSON",jsonArray);
    window.alert("created JSON ::: " + JSON);
    window.location.replace("index.html");
}


var a = '[{"main":[{"type":"custom","when":{"event":"attention","level":"50","time":"3","condition":"below"},"do":{"0":{"label":"light","action":"on"}}},{"type":"custom","when":{"event":"attention","level":"30","time":"5","condition":"above"},"do":{"0":{"label":"video","action":"play"}}}],"options":{"device":"pc","timeout":"10"}},{"main":[{"type":"custom","when":{"event":"attention","level":"20","time":"1"},"do":{"0":{"label":"light","action":"on"}}}],"options":{"device":"pc","timeout":"3"}}]';
    