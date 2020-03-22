document.addEventListener('onViewChanged', function() {
    floorplan_renderDevices();
}, false);

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
       
    console.log("floorplan: render the devices on the screen.");

    var currentFloorHtml = $("#floorplan_View .floor-with-devices.active");
    renderDevicesToFloorplan(currentFloorHtml);
}