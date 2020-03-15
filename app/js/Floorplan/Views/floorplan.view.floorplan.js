document.addEventListener('onActivateFloor', function (e) { 
    $(`#floorplan_CarouselHolder .carousel-item`).removeClass("active");
    $(`#floorplan_CarouselHolder .carousel-item[data-floor-id=${_floors.activeFloor.id}]`).addClass("active");
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
        $("#floorplan_Canvas").html("<div class='alert alert-warning'>LET OP configureer de vloeren.</div>");
    }

}, false);