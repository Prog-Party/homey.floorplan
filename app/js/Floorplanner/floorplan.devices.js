var _homey;

class Floorplanner_Devices {

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

    changeKerstboom() {
        var kerstboomId = "ca597878-0631-418d-8f83-c72363d90161";
        //_homey.devices.getDevice({ "id": kerstboomId }).then(function(device) {
        //    device.name = "Kerstboom 1337";
            var newDevice = {
                flags: [ 
                    { floorplanner_x: 12 }
                ]
            };
            _homey.devices.updateDevice({"id": kerstboomId, "device": newDevice}).then(function(device2) {
                debugger;
            }).catch(console.error);
        //}).catch(console.error);

        //var device = Homey.devices.getDevice({ "id": kerstboomId });
        //device.name = "Kerstboom 1";
        //Homey.devices.updateDevice({"id": kerstboomId, "device": device});
    }
}

var _devices = new Floorplanner_Devices();
_devices.initialize();