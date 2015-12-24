var main = (function() {

    function EegDevice() {

        this.discovering_ = false;
        this.powered_ = false;
    }

    EegDevice.prototype.updateDiscoveringToggleState = function(discovering) {
        if (this.discovering_ !== discovering) {
            this.discovering_ = discovering;
            if (discovering) {
                console.log("Discovering is on");
            } else {
                console.log("Discovering is off");
            }
        }
    };

    EegDevice.prototype.updatePoweredToggleState = function(powered) {
        if (this.powered_ !== powered) {
            this.powered_ = powered;
            if (powered) {
                console.log("Adapter radio is on");
            } else {
                console.log("Adapter radio is off");
            }
        }
    };

    EegDevice.prototype.init = function() {

        // Store the |this| to be used by API callbacks below.
        var self = this;

        // Request information about the local Bluetooth adapter state
        var updateAdapterState = function(adapterState) {
            self.updateDiscoveringToggleState(adapterState.powered)
            self.updateDiscoveringToggleState(adapterState.discovering);
        };

        //Add listener to adapter state change
        chrome.bluetooth.onAdapterStateChanged.addListener(updateAdapterState);

        //Check if a device is the Mindflex
        var checkDevice = function(device) {
            if (device.name === "Mindflex") {
                chrome.bluetooth.stopDiscovery();
            };
        }

        //device names array
        var device_names = {};

        var updateDeviceName = function(device) {
            device_names[device.address] = device.name;
        };
        var removeDeviceName = function(device) {
            delete device_names[device.address];
        }

        // Add listeners to receive newly found devices and updates
        // to the previously known devices.
        chrome.bluetooth.onDeviceAdded.addListener(updateDeviceName);
        chrome.bluetooth.onDeviceChanged.addListener(updateDeviceName);
        chrome.bluetooth.onDeviceRemoved.addListener(removeDeviceName);

        //Start discovery
        startDiscovery(function() {
            // Stop discovery after 30 seconds.
            setTimeout(function () {
                chrome.bluetooth.stopDiscovery(function () {
                });
            }, 30000);
        });


    };

    return {
        EegDevice: EegDevice
    };
})();

document.addEventListener('DOMContentLoaded', function() {
    //var eegDevice = new main.EegDevice();
    //eegDevice.init();
});