document.addEventListener('onActivateFloor', function (e) { 

    $("#configdevice_Canvas").css("background-image", `url(${_floors.activeFloor.img})`);
    $("#configdevice_Canvas").html("");

}, false);

document.addEventListener('onDevicesRetrieved', function (e) { 

    var deviceListHomey = $("#configdevice_DeviceListHomey");
    deviceListHomey.html("");

    _devices.allHomeyDevices.forEach(homeyDevice => {
        var floorplanDevice = _devices.getFloorplanDeviceByHomeyDevice(homeyDevice);
        var deviceObject = {floorplanDevice, homeyDevice};       
        deviceListHomey.append( $("#configdevice_HomeyDeviceItemTemplate").render(deviceObject));
    });
}, false);

document.addEventListener('onActivateDevice', function (e) { 
    $("#configdevice_DeviceName").html(_devices.activeHomeyDevice.name);
}, false);

