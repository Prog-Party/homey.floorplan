window.addEventListener('load', function() {
    _floors.initialize();
});

class Floorplan_Floors {

    initialize () { 
        this.allFloors = [
            { id:100, order: 1, name: 'Beneden', Image: 'http://beneden.jpg' },
            { id:200, order: 2, name: 'Boven', Image: 'http://boven.jpg' },
            { id:300, order: 3, name: 'Zolder', Image: 'http://zolder.jpg' }
        ];

        this.createButtons();
        this.initializeEvents();
    }

    createButtons() {
        this.allFloors.forEach(floor => {
            $("#floorLayoutMenu").append(`<a id='floorButton${floor.id}' href='#'>${floor.name}</a>`);
        });
    }

    initializeEvents() {
        this.allFloors.forEach(floor => {
            $(`#floorButton${floor.id}`).click(function() {
                $("#floorCanvas").css("background-image", `url(${floor.Image})`)
            });
        });
    }

    get floors() {
        return this.allFloors;
    }

    get activeFloor() {
        return this.floor;
    }
}

var _floors = new Floorplan_Floors();