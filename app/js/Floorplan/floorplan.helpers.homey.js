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
            debugger;
            console.log(`Device ${device.name} (${device.id}) temperature changed to ${value} ${device.temperatureUnits}`);
            var singleDevice = $(`div.single-device[data-device-id='${device.id}']`);
            device.temperature = value;
            singleDevice.find(".capability.temperature .value").html(device.temperature);
        });
    }
}

var _homeyHelper = new Helpers_Homey();