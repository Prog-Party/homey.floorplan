window.addEventListener('load', function() {
    _configDevice.initialize();
});

class Floorplan_ConfigDevice {

    initialize () { 
        this.initializeEvents();
    }

    initializeEvents() {
        $(document).on("click", ".device-button", function() {
            
        });
    }
}

var _configDevice = new Floorplan_ConfigDevice();