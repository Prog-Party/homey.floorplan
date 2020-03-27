class Helpers_Homey {
    constructor() {
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

    trackQuickAction(device) {
        if(!device || !device.ui || !device.ui.quickAction)
            return;

        device.makeCapabilityInstance(device.ui.quickAction, function(value){
            console.log(`Device ${device.name} (${device.id}) is turned ${value == true ? "on" : "off"}`);
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
            console.log(`Device ${device.name} (${device.id}) temperature changed to ${value} ${device.temperatureUnits}`);
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
            console.log(`Device ${device.name} (${device.id}) humidity changed to ${value} ${device.humidityUnits}`);
            var singleDevice = $(`div.single-device[data-device-id='${device.id}']`);
            device.humidity = value;
            singleDevice.find(".capability.humidity .value").html(device.humidity);
        });
    }
}

var _homeyHelper = new Helpers_Homey();