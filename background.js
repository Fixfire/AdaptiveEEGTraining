/**
 * Created by Alessandro on 23/12/15.
 */

chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('./src/view/index.html', {
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
});
