window.addEventListener('load', function() {
    _configFloor.initialize();
});

class Floorplan_ConfigFloor {

    initialize () { 
        this.initializeEvents();
    }

    initializeEvents() {
        $(document).on("click", ".floor-button", function() {
            
        });
    }
}

var _configFloor = new Floorplan_ConfigFloor();