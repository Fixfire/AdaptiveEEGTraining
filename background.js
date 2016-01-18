/**
 * Created by Alessandro on 23/12/15.
 */

chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('./index.html', {
        id: 'index',
        'outerBounds': {
            'width': 1280,
            'height': 1024
        }
    });
    
});

chrome.runtime.onSuspend.addListener(function() {
  chrome.serial.getConnections(function(connectionIdList) {
    var connectionId;
    for (connectionId in connectionIdList) {
      chrome.serial.setPaused(connectionId, true, function() {
        chrome.serial.flush(connectionId, function(resultFlush) {
          console.log("Flushed serial port");
          if (resultFlush) {
            chrome.serial.disconnect(connectionId, function(resultDisconnect) {
  			  if (resultDisconnect) {
    			console.log("Disconnected from the serial port");
  			  } else {
    		  console.log("Disconnect failed");
    		  }
  			});
  			} else {
    		console.log("Flush failed");
  			}
        });
      });
    }
  });
});
