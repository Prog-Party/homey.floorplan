document.addEventListener('onActivateFloor', function (e) { 
    $("#configfloor_name").val(_floors.activeFloor.name);
    $("#configfloor_order").val(_floors.activeFloor.order);
    $("#configfloor_image").val(_floors.activeFloor.img);
    $("#configfloor_image_plot").attr("src", _floors.activeFloor.img);

 }, false);

document.addEventListener('onFloorsRetrieved', function (e) { 
    var floorSwitcherMenu = $("#configfloor_FloorOverview");
    floorSwitcherMenu.html("");

    _floors.allFloors.forEach(floor => {
        var button = `<a class='floor-button' data-floor-id='${floor.id}' href='#'>${floor.name}</a>`;
        floorSwitcherMenu.append(button);
    });
        
    if(_floors.allFloors.length > 0) {
        _floors.activateFloor(_floors.allFloors[0].id);
    }
}, false);

$(document).on("click", "#configfloor_AddFloor", function() {
    _floors.addFloor($("#configfloor_name").val(), $("#configfloor_order").val(), $("#configfloor_image").val());
});

