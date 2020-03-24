window.addEventListener('load', function() {
    _devices.initialize();
});

document.addEventListener('onHomeyLoaded', function (obj) { 
    _devices.initializeHomey(obj.detail);
});

class Floorplan_Devices {
    constructor() {
        this.onActivateDeviceEvent = new Event('onActivateDevice');
        this.onDevicesRetrievedEvent = new Event('onDevicesRetrieved');
        this.onDeviceDeletedEvent = new Event('onDeviceDeleted');

        this.initializeEvents();
        this._devicesAreInitialized = false;
    }

    initialize () {
        this.retrieveAllFloorplanDevices();
    }

    initializeEvents() {
        $(document).on("click", ".homey-device-button", function() {
            var homeydeviceId = $(this).attr("data-device-id");
            _devices.activateHomeyDevice(homeydeviceId);
        });
    }

    initializeHomey(homey){
        this._homey = homey;
        
        this._homey.devices.getDevices().then(function(devices) {
            let array = [];
            for (let key in devices) {
                array.push(devices[key]);  // convert devices dict to list
            }

           _devices._allHomeyDevices = array;
           _devices._allHomeyDevices.forEach(h => {
               let isOn = h.capabilitiesObj && h.capabilitiesObj[h.ui.quickAction] && h.capabilitiesObj[h.ui.quickAction].value === true;
               h.isOn = isOn;
           });
           _devices.renderAfterRetrieve();
           _devices.trackDeviceEvents();
        });
    }

    trackDeviceEvents() {
        console.log("Track device events");
        _devices._allHomeyDevices.forEach(function(device){
            if(!device || !device.ui || !device.ui.quickAction)
                return;

            device.makeCapabilityInstance(device.ui.quickAction, function(value){
                //_devices.turnDeviceOnOff(device.id, value);
                console.log(`Device ${device.name} (${device.id}) is turned ${value == true ? "on" : "off"}`);
                var singleDevice = $(`div.single-device[data-device-id='${device.id}']`);
                device.isOn = value;
                if(value)
                    singleDevice.addClass("device-on");
                else
                    singleDevice.removeClass("device-on");
            });
          });
    }

    turnDeviceOn(deviceId) {    
        this.toggleDevice(deviceId, true);
    }
    
    turnDeviceOff(deviceId) {
        this.toggleDevice(deviceId, false);
    }

    toggleDevice(deviceId, value) {
        var device = this.getHomeyDeviceById(deviceId); 
        
        if(!device || !device.ui || !device.ui.quickAction)
        {
            console.log(`You tried to turn ${value == true ? "on" : "off"}, but this is not possible for the device ${device.name} (${device.id}).`);
            return;
        }

        this._homey.devices.setCapabilityValue({
            deviceId: device.id,
            capabilityId: device.ui.quickAction,
            value: value,
          }).catch(console.error);       
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
        if(this.allHomeyDevices && this.allFloorplanDevices)
        {
            this._devicesAreInitialized = true;
            document.dispatchEvent(this.onDevicesRetrievedEvent);
        }
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
            document.dispatchEvent(_devices.onDeviceDeletedEvent);
            _devices.retrieveAllFloorplanDevices();
        });
    }

    getFloorplanDevice(homeyDevice) {
        var device = this.allFloorplanDevices.filter(d => d.deviceId == homeyDevice.id);
        return device.length > 0 ? device[0] : null;
    }

    getHomeyDevice(floorplanDevice) {
        return this.getHomeyDeviceById(floorplanDevice.deviceId);
    }

    getHomeyDeviceById(deviceId) {
        var device = this.allHomeyDevices.filter(d => d.id == deviceId);
        return device.length > 0 ? device[0] : null;
    }

    activateHomeyDevice(homeyDeviceId) {
        var device = _devices.allHomeyDevices.filter(d => d.id == homeyDeviceId)[0];
        this._activeHomeyDevice = device;
        this._activeFloorplanDevice = this.getFloorplanDevice(device);
        document.dispatchEvent(this.onActivateDeviceEvent);
    }
    
    get activeHomeyDevice() {
        return this._activeHomeyDevice;
    }

    get activeFloorplanDevice() {
        return this._activeFloorplanDevice;
    }

    get allFloorplanDevices() {
        return this._allFloorplanDevices;
    }

    get allHomeyDevices() {
        return this._allHomeyDevices;
    }

    get devicesAreInitialized() {
        return this._devicesAreInitialized;
    }
}

var _devices = new Floorplan_Devices();