window.addEventListener('load', function() {
    $('#configdevice_View input[type=range]').on('change mousemove', function () {
        updateDeviceLocation();
    });
});

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
    sinlgeDevice.css("left", $("#configdevice_DeviceLocationX").val() + "%");
    sinlgeDevice.css("top", $("#configdevice_DeviceLocationY").val() + "%");
}