document.addEventListener('onActivateFloor', function (e) { 
    $(`#floorplan_CarouselHolder .carousel-item`).removeClass("active");
    $(`#floorplan_CarouselHolder .carousel-item[data-floor-id=${_floors.activeFloor.id}]`).addClass("active");

    floorplan_renderDevices();
 }, false);

document.addEventListener('onFloorsRetrieved', function (e) { 
    var floorSwitcherMenu = $("#floorplan_FloorSwitcherMenu");
    floorSwitcherMenu.html("");
    $("#floorplan_CarouselHolder").html($("#floorplan_DefaultCarouselTemplate").render());

    _floors.allFloors.forEach(floor => {
        // Toevoegen van de knoppen
        var button = `<a class='floor-button' data-floor-id='${floor.id}' href='#'>${floor.name}</a>`;
        floorSwitcherMenu.append(button);

        // Opbouwen van de carousel
        $("#floorplan_CarouselHolder .carousel-inner").append($("#floorplan_CarouselItemTemplate").render(floor));
    });

    $('#floorplan_CarouselHolder .carousel').carousel({interval: 0});

    if(_floors.allFloors.length > 0) {
        _floors.activateFloor(_floors.allFloors[0].id);
    } else {
        $("#floorplan_View").html("<div class='alert alert-warning' style='margin-left:25%;margin-right:25%'>LET OP: configureer de vloeren.</div>");
    }

    floorplan_renderDevices();
}, false);

document.addEventListener('onDevicesRetrieved', function (e) { 
    floorplan_renderDevices();
}, false);

function floorplan_renderDevices() {
    if(!_floors.floorsAreInitialized || !_devices.devicesAreInitialized)
        return;

    if(_floors.allFloors.length == 0)
       return; 

    console.log("Render the devices on the screen.");

    //get the height and width of the img
    var currentFloor = _floors.activeFloor;

    var currentFloorHtml = $("#floorplan_View .carousel-item.active");
    var deviceHolder = $(currentFloorHtml).find(".device-holder");
    deviceHolder.html("");
    var floorImage = $(currentFloorHtml).find("img");
    deviceHolder.height(floorImage.height());
    deviceHolder.width(floorImage.width());

    _devices.allFloorplanDevices.filter(device => device.floorId == currentFloor.id).forEach(floorplanDevice => {
        var homeyDevice = _devices.getHomeyDevice(floorplanDevice);
        console.log("Add device " + homeyDevice.name + " to viewer");
        var html = `<div style='left: ${floorplanDevice.x}%; top: ${floorplanDevice.y}%; width: 20px; height: 20px; background-color: red; position: absolute; '></div>`;

        deviceHolder.append(html);
    });
}