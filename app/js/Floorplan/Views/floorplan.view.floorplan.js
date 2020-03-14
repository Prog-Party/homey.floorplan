document.addEventListener('onActivateFloor', function (e) { 

    $("#floorplan_Canvas").css("background-image", `url(${_floors.activeFloor.img})`);
 }, false);

document.addEventListener('onFloorsRetrieved', function (e) { 
    var floorSwitcherMenu = $("#floorplan_FloorSwitcherMenu");
    floorSwitcherMenu.html("");

    _floors.allFloors.forEach(floor => {
        var button = `<a class='floor-button' data-floor-id='${floor.id}' href='#'>${floor.name}</a>`;
        floorSwitcherMenu.append(button);
    });
        
    if(_floors.allFloors.length > 0) {
        _floors.activateFloor(_floors.allFloors[0].id);
    }
}, false);