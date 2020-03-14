var _homey;

class Floorplan_Devices {

    constructor() {
    }

    initialize () {
        this.initializeDevices();
     }

    initializeDevices() {
        if(!_homey)
        {
            // homey isn't initialized yet, try again in a few ms
            setTimeout(_devices.initializeDevices, 300);
            return;
        }
        
        _homey.devices.getDevices().then(function(devices) {
            _devices.allDevices = devices;
        });
    }

    get devices() {
        return this.allDevices;
    }
}

var _devices = new Floorplan_Devices();
_devices.initialize();