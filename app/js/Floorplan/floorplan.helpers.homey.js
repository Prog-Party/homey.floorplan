class Helpers_Homey {
    constructor() {
    }
    
    initializeDevice(device) {
        this.setQuickAction(device);
        this.setTemperature(device);
        this.setHumidity(device);
        this.setAlarmIsOn(device);
        this.setAlarmOpenClose(device);
    }

    trackDeviceEvent(device) {
        this.trackQuickAction(device);
        this.trackTemperature(device);
        this.trackHumidity(device);
        this.trackMotionAlarm(device);
        this.trackMotionAlarmOpenClose(device);
    }

    setQuickAction(device) {
        var quickAction = device.ui.quickAction;
        let isOn = device.capabilitiesObj && device.capabilitiesObj[quickAction] && device.capabilitiesObj[quickAction].value === true;
        device.isOn = isOn;
    }

    setTemperature(device) {
        let capabilityName = "measure_temperature";
        if(!device.capabilitiesObj || !device.capabilitiesObj[capabilityName] || device.class != "sensor")
            return;
            
        let capability = device.capabilitiesObj[capabilityName];
        device.temperature = capability.value;
        device.temperatureUnits = capability.units;
    }

    setHumidity(device) {
        let capabilityName = "measure_humidity";
        if(!device.capabilitiesObj || !device.capabilitiesObj[capabilityName] || device.class != "sensor")
            return;
            
        let capability = device.capabilitiesObj[capabilityName];
        device.humidity = capability.value;
        device.humidityUnits = capability.units;
    }

    setAlarmIsOn(device) {
        let capabilityName = "alarm_motion";
        if(!device.capabilitiesObj || !device.capabilitiesObj[capabilityName] || device.class != "sensor")
            return;
            
        let capability = device.capabilitiesObj[capabilityName];
        device.alarmIsOn = capability.value;
    }
    
    setAlarmOpenClose(device) {
        let capabilityName = "alarm_contact";
        if(!device.capabilitiesObj || !device.capabilitiesObj[capabilityName] || device.class != "sensor")
            return;
            
        let capability = device.capabilitiesObj[capabilityName];
        device.alarmOpenCloseIsOn = capability.value;
    }

    trackQuickAction(device) {
        if(!device || !device.ui || !device.ui.quickAction)
            return;

        device.makeCapabilityInstance(device.ui.quickAction, function(value){
            console.log(`${getDateTime()} - Device ${device.name} (${device.id}) is turned ${value == true ? "on" : "off"}`);
            var singleDevice = $(`div.single-device[data-device-id='${device.id}']`);
            device.isOn = value;
            if(value)
                singleDevice.addClass("device-on");
            else
                singleDevice.removeClass("device-on");
        });
    }
    
    trackTemperature(device) {
        let capabilityName = "measure_temperature";
        if(!device || !device.temperature)
            return;

        device.makeCapabilityInstance(capabilityName, function(value){
            console.log(`${getDateTime()} - Device ${device.name} (${device.id}) temperature changed to ${value} ${device.temperatureUnits}`);
            var singleDevice = $(`div.single-device[data-device-id='${device.id}']`);
            device.temperature = value;
            singleDevice.find(".capability.temperature .value").html(device.temperature);
        });
    }
    
    trackHumidity(device) {
        let capabilityName = "measure_humidity";
        if(!device || !device.humidity)
            return;

        device.makeCapabilityInstance(capabilityName, function(value){
            console.log(`${getDateTime()} - Device ${device.name} (${device.id}) humidity changed to ${value} ${device.humidityUnits}`);
            var singleDevice = $(`div.single-device[data-device-id='${device.id}']`);
            device.humidity = value;
            singleDevice.find(".capability.humidity .value").html(device.humidity);
        });
    }
    
    trackMotionAlarm(device) {
        let capabilityName = "alarm_motion";
        if(!device || device.alarmIsOn === undefined)
            return;

        device.makeCapabilityInstance(capabilityName, function(value){
            console.log(`${getDateTime()} - Device ${device.name} (${device.id}) alarm is turned ${value == true ? "on" : "off"}`);
            var singleDevice = $(`div.single-device[data-device-id='${device.id}']`);
            device.alarmIsOn = value;
            if(value)
                singleDevice.addClass("device-alarm-on");
            else
                singleDevice.removeClass("device-alarm-on");
        });
    }

    trackMotionAlarmOpenClose(device) {
        let capabilityName = "alarm_contact";
        if(!device || device.alarmOpenCloseIsOn === undefined)
            return;

        device.makeCapabilityInstance(capabilityName, function(value){
            console.log(`${getDateTime()} - Device ${device.name} (${device.id}) open close alarm is turned ${value == true ? "on" : "off"}`);
            var singleDevice = $(`div.single-device[data-device-id='${device.id}']`);
            device.alarmOpenCloseIsOn = value;
            if(value)
                singleDevice.addClass("device-alarm-on");
            else
                singleDevice.removeClass("device-alarm-on");
        });
    }
}

var _homeyHelper = new Helpers_Homey();