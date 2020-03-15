window.addEventListener('load', function() {
    _devices.initialize();
});

document.addEventListener('onHomeyLoaded', function (obj) { 
    _devices.initializeHomey(obj.detail);
});

class Floorplan_Devices {
    constructor() {
        this.onDevicesRetrievedEvent = new Event('onDevicesRetrieved');
    }

    initialize () {
        this.retrieveAllFloorplanDevices();
    }

    initializeHomey(homey){
        this._homey = homey;
        
        this._homey.devices.getDevices().then(function(devices) {
            var array = [];
            for (var key in devices) {
                array.push(devices[key]);  // convert devices dict to list
            }

           _devices._allHomeyDevices = array;
           _devices.renderAfterRetrieve();
        });
    }

    retrieveAllFloorplanDevices() {
         var url = "https://progparty-homey-floorplan.azurewebsites.net/api/GetAllDevices?code=YxKxy4Ttn4ZVcA2zaK3Ay2J4bbMPMPLkPqu1LTfGGP3h//U0GRPp3w==";
         url += "&token=" + getToken();

        $.get(url, function(json) {
             console.log("Devices are retrieved");
             _devices._allFloorplanDevices = JSON.parse(json);
             _devices.renderAfterRetrieve();
        });
    }

    renderAfterRetrieve() {
        console.log("Try rendering");
        if(this.allHomeyDevices && this.allFloorplanDevices)
            document.dispatchEvent(this.onDevicesRetrievedEvent);
        else
            console.log("Rendering not possible yet");
    }

    addDevice(deviceId, x, y, floorId) {
        var url = "https://progparty-homey-floorplan.azurewebsites.net/api/AddDevice?code=lfiJh1Onn5R6kr1AwBZLvXqEQ7wDu91ao59jwmoip2H7c0qgtJCXpQ==";
        url += "&token=" + getToken();
        url += "&x=" + x;
        url += "&y=" + y;
        url += "&floorId=" + floorId;
        url += "&deviceId=" + deviceId;

        console.log(url);
        $.get(url, function(json) {
            console.log(`Adding floorplan device worked (${json})`);
            _devices.retrieveAllFloorplanDevices();
        });
    }

    updateDevice(deviceId, x, y, floorId) {
        var url = "https://progparty-homey-floorplan.azurewebsites.net/api/UpdateDevice?code=pDOyNoBQRmDPCs8w9guiuyMtRCh79Sn6nOsxkh7LzysfHPmeSPaJEQ==";
        url += "&token=" + getToken();
        url += "&x=" + x;
        url += "&y=" + y;
        url += "&floorId=" + floorId;
        url += "&deviceId=" + deviceId;

        console.log(url);
        $.get(url, function(json) {
            console.log(`Updating floorplan device worked (${json})`);
            _devices.retrieveAllFloorplanDevices();
        });
    }

    deleteDevice(deviceId) {
        var url = "https://progparty-homey-floorplan.azurewebsites.net/api/DeleteDevice?code=k1d7E91s7AUFu0AJ8xAstLnL3aPehSv9MSN3UK7BAHlgnminQl0dYA==";
        url += "&token=" + getToken();
        url += "&deviceId=" + deviceId;
        
        console.log(url);
        $.get(url, function(json) {
            console.log(`Removing floorplan device worked (${json})`);
            _devices.retrieveAllFloorplanDevices();
        });
    }

    getFloorplanDeviceByHomeyDevice(homeyDevice) {
        var device = this.allFloorplanDevices.filter(d => d.deviceId == homeyDevice.id);
        return device.length > 0 ? device[0] : null;
    }

    activateHomeyDevice(homeyDevice) {
        this._activeHomeyDevice = homeyDevice;
        this._activeFloorplanDevice = this.getFloorplanDeviceByHomeyDevice(homeyDevice);
    }

    get allFloorplanDevices() {
        return this._allFloorplanDevices;
    }

    get allHomeyDevices() {
        return this._allHomeyDevices;
    }
}

var _devices = new Floorplan_Devices();