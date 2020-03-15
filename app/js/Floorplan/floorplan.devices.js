window.addEventListener('load', function() {
    _devices.initialize();
});

 var _homey;

class Floorplan_Devices {

   
   //     if(!_homey)
    //    {
            // homey isn't initialized yet, try again in a few ms
    //        setTimeout(_devices.initializeDevices, 300);
    //        return;
    //    }
        
    //    _homey.devices.getDevices().then(function(devices) {
    //        _devices.allDevices = devices;
    //    });

    constructor() {
        //this.onActivateFloorEvent = new Event('onActivateFloor');
        this.onDevicesRetrievedEvent = new Event('onDevicesRetrieved');
        //this.initializeEvents();
    }

    initialize () {
        this.retrieveAllDevices();
    }

    retrieveAllDevices() {
         var url = "https://progparty-homey-floorplan.azurewebsites.net/api/GetAllDevices?code=YxKxy4Ttn4ZVcA2zaK3Ay2J4bbMPMPLkPqu1LTfGGP3h//U0GRPp3w==";
         url += "&token=" + getToken();

        $.get(url, function(json) {
             console.log("Devices are retrieved");
             _devices._allDevices = JSON.parse(json);
            
             document.dispatchEvent(_devices.onDevicesRetrievedEvent);
        });
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
            console.log(`Adding device worked (${json})`);
            _devices.retrieveAllDevices();
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
            console.log(`Updating device worked (${json})`);
            _devices.retrieveAllDevices();
        });
    }

    deleteDevice(deviceId) {
        var url = "https://progparty-homey-floorplan.azurewebsites.net/api/DeleteDevice?code=k1d7E91s7AUFu0AJ8xAstLnL3aPehSv9MSN3UK7BAHlgnminQl0dYA==";
        url += "&token=" + getToken();
        url += "&deviceId=" + deviceId;
        
        console.log(url);
        $.get(url, function(json) {
            console.log(`Removing device worked (${json})`);
            _devices.retrieveAllDevices();
        });
    }

    // get activeFloor() {
    //     return this._activeFloor;
    // }

    get allDevices() {
        return this._allDevices;
    }
}

var _devices = new Floorplan_Devices();