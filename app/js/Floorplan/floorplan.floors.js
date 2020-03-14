window.addEventListener('load', function() {
    _floors.initialize();
});

class Floorplan_Floors {

    initialize () { 
        this.floorLayoutMenu = $("#floorLayoutMenu");
        this.floorCanvas = $("#floorCanvas");
        this.floorEditLayoutMenu = $("#floorEditLayoutMenu");

        this.initializeEvents();

        //retrieve the floors from database
        var token = getToken();
        var functionUrl = "https://progparty-homey-floorplan.azurewebsites.net/api/GetAllFloors?code=sl30LU/RJhGWyaUj1zQKrXARPTGEyW/aZCuFRP6mR41GL7G7x0ihlA==";
        var url = functionUrl + "&token=" + token;

        console.log(url);
        $.get(url, function(json) {
            //retrieving floors from database worked
            _floors.allFloors = JSON.parse(json);
            _floors.allFloors = _floors.allFloors.sort((a,b) => a.order - b.order);
            _floors.initializeButtons();
        });
    }

    initializeButtons() {
        this.allFloors.forEach(floor => {
            var button = `<a class='floor-button' data-floor-id='${floor.id}' href='#'>${floor.name}</a><br />`;
            _floors.floorLayoutMenu.append(button);
            _floors.floorEditLayoutMenu.append(button);
        });
        
        if(this.allFloors.length > 0) {
            this.activateFloor(this.allFloors[0].id);
        }
    }

    initializeEvents() {
        $(document).on("click", ".floor-button", function() {
            var floorId = $(this).attr("data-floor-id");
            _floors.activateFloor(floorId);
        });

        $("#floorConfigButton").click(function() {
            console.log("floorConfigButton click");
        });
    }

    activateFloor(floorId) {
        var floor = _floors.allFloors.filter(f => f.id == floorId)[0];
        this._activeFloor = floor;
        this.floorCanvas.css("background-image", `url(${floor.img})`);
    }

    get activeFloor() {
        return this._activeFloor;
    }
}

var _floors = new Floorplan_Floors();