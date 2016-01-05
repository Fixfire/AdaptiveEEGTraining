chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('./view/index.html', {
        'outerBounds': {
            'width': 1280,
            'height': 1024
        }
    });
});