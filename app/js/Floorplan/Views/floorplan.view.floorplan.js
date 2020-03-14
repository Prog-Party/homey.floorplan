document.addEventListener('onActivateFloor', function (e) { 

    $("#floorplan_Canvas").css("background-image", `url(${_floors.activeFloor.img})`);
 }, false);