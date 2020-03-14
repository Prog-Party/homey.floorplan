window.addEventListener('load', function() {
    _floors.initialize();
});

class Floorplan_Floors {

    initialize () { 
        this.floorLayoutMenu = $("#floorplan_LayoutMenu");
        this.floorCanvas = $("#floorplan_Canvas");
        this.floorEditLayoutMenu = $("#configfloor_LayoutMenu");

        this.initializeEvents();
        this.retrieveAllFloors();
    }

    retrieveAllFloors() {
        //retrieve the floors from database
        var url = "https://progparty-homey-floorplan.azurewebsites.net/api/GetAllFloors?code=sl30LU/RJhGWyaUj1zQKrXARPTGEyW/aZCuFRP6mR41GL7G7x0ihlA==";
        url += "&token=" + getToken();

        console.log(url);
        $.get(url, function(json) {
            //retrieving floors from database worked
            _floors.allFloors = JSON.parse(json);
            _floors.allFloors = _floors.allFloors.sort((a,b) => a.order - b.order);
            _floors.initializeButtons();
        });
    }

    initializeButtons() {
        _floors.floorLayoutMenu.html("");
        _floors.floorEditLayoutMenu.html("");

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

        $("#configfloor_Button").click(function() {
            console.log("floorConfigButton click");
        });
    }

    activateFloor(floorId) {
        var floor = _floors.allFloors.filter(f => f.id == floorId)[0];
        this._activeFloor = floor;
        this.floorCanvas.css("background-image", `url(${floor.img})`);
    }

    addFloor(name, order, image) {
        var url = "https://progparty-homey-floorplan.azurewebsites.net/api/AddFloor?code=DZOZHKHYawTcGf/o19ZVi5CAmeciz747E2lWLHmEqQa3PHf1RJHQiQ==";
        url += "&token=" + getToken();
        url += "&order=" + order;
        url += "&image=" + image;
        url += "&name=" + name;

        console.log(url);
        $.get(url, function(json) {
            console.log(`Adding floor worked (${json})`);
            _floors.retrieveAllFloors();
        });
    }

    updateFloor(floorId, name, order, image) {
        var url = "https://progparty-homey-floorplan.azurewebsites.net/api/UpdateFloor?code=O6ac1A8x8B1i5H55wszVK5WQhsOjXy8k8nsWIn/MpTk9jQyoMgZp/Q==";
        url += "&token=" + getToken();
        url += "&floorId=" + floorId;
        url += "&order=" + order;
        url += "&image=" + image;
        url += "&name=" + name;

        console.log(url);
        $.get(url, function(json) {
            console.log(`Updating floor worked (${json})`);
            _floors.retrieveAllFloors();
        });
    }

    deleteFloor(floorId) {
        var url = "https://progparty-homey-floorplan.azurewebsites.net/api/DeleteFloor?code=n8pqdURM7bxOQW9XyfTq88Kc2NxbQIEdxkzmAuhGljS3zFwiS8bmPQ==";
        url += "&token=" + getToken();
        url += "&floorId=" + floorId;
        
        console.log(url);
        $.get(url, function(json) {
            console.log(`Removing floor worked (${json})`);
            _floors.retrieveAllFloors();
        });
    }

    get activeFloor() {
        return this._activeFloor;
    }
}

var _floors = new Floorplan_Floors();