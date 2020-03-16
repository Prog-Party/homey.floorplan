window.addEventListener('load', function() {
    $('#configdevice_View input[type=range]').on('change mousemove', function () {
        updateDeviceLocation();
    });
});

document.addEventListener('onViewChanged', function() {
    configdevice_renderDevices();
}, false);

document.addEventListener('onActivateFloor', function (e) { 

    $("#configdevice_Floor").attr("src", _floors.activeFloor.img);

}, false);

document.addEventListener('onDevicesRetrieved', function (e) { 

    var deviceListHomey = $("#configdevice_DeviceListHomey");
    deviceListHomey.html("");

    _devices.allHomeyDevices.forEach(homeyDevice => {

        var floorplanDevice = _devices.getFloorplanDevice(homeyDevice);
        var deviceObject = {floorplanDevice, homeyDevice};       
        deviceListHomey.append( $("#configdevice_HomeyDeviceItemTemplate").render(deviceObject));
    });
    
    configdevice_renderDevices();
}, false);

document.addEventListener('onFloorsRetrieved', function (e) {
    configdevice_renderDevices();
}, false);

document.addEventListener('onActivateDevice', function (e) { 
    $("#configdevice_DeviceName").html(_devices.activeHomeyDevice.name);
    $("#configdevice_DeviceLocationX").val(parseFloat(_devices.activeFloorplanDevice.x) * 100);
    $("#configdevice_DeviceLocationY").val(parseFloat(_devices.activeFloorplanDevice.y) * 100);
}, false);


function configdevice_renderDevices() {
    if(!_floors.floorsAreInitialized || !_devices.devicesAreInitialized)
        return;

    if(_floors.allFloors.length == 0)
       return; 
       
    console.log("configdevice: Render the devices to the screen.");

    //get the height and width of the img
    var currentFloor = _floors.activeFloor;

    var currentFloorHtml = $("#configdevice_View .floor-with-devices");
    var deviceHolder = $(currentFloorHtml).find(".device-holder");
    deviceHolder.html("");
    var floorImage = $(currentFloorHtml).find("img");
    deviceHolder.height(floorImage.height());
    deviceHolder.width(floorImage.width());

    _devices.allFloorplanDevices.filter(device => device.floorId == currentFloor.id).forEach(floorplanDevice => {
        var homeyDevice = _devices.getHomeyDevice(floorplanDevice);
        var data = {homeyDevice, floorplanDevice};
        console.log(`Add device ${homeyDevice.name} to configdevice viewer`);
        deviceHolder.append($("#SingleDeviceTemplate").render(data));
    });
}

function updateDeviceLocation() {
    if(_devices.activeHomeyDevice == null)
        return;
    console.log("Device locatie is veranderd");
    var homeyId = _devices.activeHomeyDevice.id;
    var sinlgeDevice = $(`#configdevice_View .single-device[data-device-id=${homeyId}]`);

    var xLocation = parseFloat($("#configdevice_DeviceLocationX").val())/100;
    var yLocation = parseFloat($("#configdevice_DeviceLocationY").val())/100;

    sinlgeDevice.css("left", xLocation + "%");
    sinlgeDevice.css("top", yLocation + "%");
}

$(document).on("click", ".homey-device-to-floorplan-button", function() {
    var homeydeviceId = $(this).attr("data-device-id");
    _devices.activateHomeyDevice(homeydeviceId);
    _devices.addDevice(homeydeviceId, 50, 50, _floors.activeFloor.id);
});

$(document).on("click", "#configdevice_UpdateDevice", function() {
    var xLocation = parseFloat($("#configdevice_DeviceLocationX").val())/100;
    var yLocation = parseFloat($("#configdevice_DeviceLocationY").val())/100;

    _devices.updateDevice(_devices.activeHomeyDevice.id, xLocation, yLocation, _floors.activeFloor.id);
});

$(document).on("click", "#configdevice_DeleteDevice", function() {
    _devices.deleteDevice(_devices.activeHomeyDevice.id);
});
