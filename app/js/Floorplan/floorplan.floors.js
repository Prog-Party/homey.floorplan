
class Floorplan_Floors {

    initialize () { 
        this.allFloors = [
            { order: 1, name: 'Beneden', img: 'http://iets.jpg' }
        ];
    }

    get floors() {
        return this.allFloors;
    }
}

var _floors = new Floorplan_Floors();
_floors.initialize();