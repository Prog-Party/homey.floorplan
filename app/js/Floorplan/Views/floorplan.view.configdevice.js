document.addEventListener('onActivateFloor', function (e) { 

    $("#configdevice_Canvas").css("background-image", `url(${_floors.activeFloor.img})`);
    $("#configdevice_Canvas").html("");

}, false);

document.addEventListener('onDevicesRetrieved', function (e) { 

    var deviceListHomey = $("#configdevice_DeviceListHomey");

    var device = '';

    _devices.allHomeyDevices.forEach(homeyDevice => {

        var floorplanDevice = _devices.getFloorplanDeviceByHomeyDevice(homeyDevice);
        var deviceObject = {floorplanDevice, homeyDevice};       

        if(floorplanDevice == null)
            device += `<div><a class='device-button' data-device-id='${homeyDevice.id}' href='#'>Add</a></div>`;    
        else
            device += `Vinkje`;

        device += `<div><a class='device-button' data-device-id='${homeyDevice.id}' href='#'>${homeyDevice.name}</a></div>`;
        deviceListHomey.append(device);
    });
}, false);

