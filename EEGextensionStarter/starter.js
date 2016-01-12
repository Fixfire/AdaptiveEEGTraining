
var queryString = (window.location.href).substr((window.location.href).indexOf('?') + 1); 
var value = (queryString.split('='))[1];
value = decodeURIComponent(value);



chrome.storage.local.set({'JSONsession': value});
chrome.management.launchApp("hhccckalaoabhoffpkjpifaigiinhblo");