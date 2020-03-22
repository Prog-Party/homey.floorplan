window.addEventListener('load', function() {
    $('#configdevice_View input[type=range]').on('change mousemove', function () {
        updateDeviceLocation();
    });
});

window.addEventListener("resize", function(e){
    configdevice_renderDevices();
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

document.addEventListener('onDeviceDeleted', function(e) {
    $("#configdevice_DeviceSettings").hide();
}, false);

document.addEventListener('onFloorsRetrieved', function (e) {
    var floorSwitcherMenu = $("#configdevice_FloorSwitcherMenu");
    floorSwitcherMenu.html("");

    _floors.allFloors.forEach(floor => {
        var button = `<a class='floor-button' data-floor-id='${floor.id}' href='#'>${floor.name}</a>`;
        floorSwitcherMenu.append(button);
    });

    configdevice_renderDevices();
}, false);

document.addEventListener('onActivateDevice', function (e) { 
    $("#configdevice_DeviceSettings").show();
    $("#configdevice_DeviceName").html(_devices.activeHomeyDevice.name);

    if(_devices.activeFloorplanDevice) {
        $("#configdevice_DeviceLocationX").val(parseFloat(_devices.activeFloorplanDevice.x) * 100);
        $("#configdevice_DeviceLocationY").val(parseFloat(_devices.activeFloorplanDevice.y) * 100);
    } else {
        $("#configdevice_DeviceLocationX").val(50 * 100);
        $("#configdevice_DeviceLocationY").val(50 * 100);
    }

    $("#configdevice_FloorSelector").empty();
    _floors.allFloors.forEach(floor => {
        $("#configdevice_FloorSelector").append( new Option(floor.name, floor.id));
    });

    $("#configdevice_FloorSelector").val(_devices.activeFloorplanDevice.floorId);
    _floors.activateFloor(_devices.activeFloorplanDevice.floorId);

    configdevice_renderDevices();

}, false);

$(document).on("click", ".homey-device-to-floorplan-button", function() {
    var homeydeviceId = $(this).attr("data-device-id");
    _devices.activateHomeyDevice(homeydeviceId);
    _devices.addDevice(homeydeviceId, 50, 50, _floors.activeFloor.id);
});

$(document).on("change", "#configdevice_FloorSelector", function() {
    _floors.activateFloor($("#configdevice_FloorSelector").val());
});

$(document).on("click", "#configdevice_UpdateDevice", function() {
    var xLocation = parseFloat($("#configdevice_DeviceLocationX").val())/100;
    var yLocation = parseFloat($("#configdevice_DeviceLocationY").val())/100;

    _devices.updateDevice(_devices.activeHomeyDevice.id, xLocation, yLocation, _floors.activeFloor.id);
});

$(document).on("click", "#configdevice_DeleteDevice", function() {
    _devices.deleteDevice(_devices.activeHomeyDevice.id);
});

function configdevice_renderDevices() {
    if(!_floors.floorsAreInitialized || !_devices.devicesAreInitialized)
        return;

    if(_floors.allFloors.length == 0)
       return; 
       
    console.log("configdevice: Render the devices to the screen.");
    removeLoader("configdevice_UpdateDevice_Loader");
    removeLoader("configdevice_DeleteDevice_Loader");

    var currentFloorHtml = $("#configdevice_View .floor-with-devices");

    renderDevicesToFloorplan(currentFloorHtml);
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