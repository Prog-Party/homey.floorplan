window.addEventListener('load', function() {
    _devices.initialize();
});

document.addEventListener('onActivateFloor', function (e) { 

    $("#configdevice_Canvas").css("background-image", `url(${_floors.activeFloor.img})`);
    $("#configdevice_Canvas").html("");

}, false);

document.addEventListener('onDevicesRetrieved', function (e) { 

    var deviceListHomey = $("#configdevice_DeviceListHomey");
    deviceListHomey.html("");

    _devices.allHomeyDevices.forEach(homeyDevice => {

        var floorplanDevice = _devices.getFloorplanDevice(homeyDevice);
        var deviceObject = {floorplanDevice, homeyDevice};       
        deviceListHomey.append( $("#configdevice_HomeyDeviceItemTemplate").render(deviceObject));
    });
}, false);

document.addEventListener('onActivateDevice', function (e) { 
    $("#configdevice_DeviceName").html(_devices.activeHomeyDevice.name);
}, false);

$(document).on("click", ".homey-device-to-floorplan-button", function() {
    var homeydeviceId = $(this).attr("data-device-id");
    _devices.activateHomeyDevice(homeydeviceId);
    _devices.addDevice(homeydeviceId, 50, 50, _floors.activeFloor.id);
});

$(document).on("click", "#configfloor_AddFloor", function() {
    _floors.addFloor($("#configfloor_name").val(), $("#configfloor_order").val(), $("#configfloor_image").val());

    if(_floors.allFloors.length > 0) {
        $("#configfloor_UpdateFloor").show();
        $("#configfloor_DeleteFloor").show();
    }
});

$(document).on("click", "#configdevice_UpdateDevice", function() {
    _devices.updateDevice(_devices.activeHomeyDevice.id, $("#configdevice_DeviceLocationX").val(), $("#configdevice_DeviceLocationY").val(), _floors.activeFloor.id);
});

$(document).on("click", "#configdevice_DeleteDevice", function() {
    _devices.deleteDevice(_devices.activeHomeyDevice.id);
});
