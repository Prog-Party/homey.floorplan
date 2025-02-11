window.addEventListener('load', function() {
    _floors.initialize()
})

class Floorplan_Floors {
    constructor() {
        this.onActivateFloorEvent = new Event('onActivateFloor')
        this.onFloorsRetrievedEvent = new Event('onFloorsRetrieved')
        this._floorsAreInitialized = false
        this.initializeEvents()
    }

    initialize() {
        this.retrieveAllFloors()
    }

    retrieveAllFloors() {
        if (!hasToken()) {
            console.error('No Homey token found.')
            return
        }

        let url = 'https://progparty-homey-floorplan.azurewebsites.net/api/GetAllFloors?code=sl30LU/RJhGWyaUj1zQKrXARPTGEyW/aZCuFRP6mR41GL7G7x0ihlA=='
        url += '&token=' + getToken()

        $.get(url, function(json) {
            _floors._allFloors = JSON.parse(json)
            _floors._allFloors = _floors.allFloors.sort((a, b) => a.order - b.order)

            _floors._floorsAreInitialized = true
            document.dispatchEvent(_floors.onFloorsRetrievedEvent)

            if (_floors.allFloors.length > 0) {
                _floors.activateFloor(_floors.allFloors[0].id)
            }
        })
    }

    initializeEvents() {
        $(document).on('click', '.floor-button', function() {
            const floorId = $(this).attr('data-floor-id')
            _floors.activateFloor(floorId)
        })
    }

    activateFloor(floorId) {
        const floor = _floors.allFloors.filter(f => f.id === floorId)[0]
        this._activeFloor = floor
        document.dispatchEvent(this.onActivateFloorEvent)
    }

    addFloor(name, order, image) {
        if (!name) {
            name = 'Floor x'
        }
        if (!order) {
            order = '1'
        }
        if (!image) {
            image = 'http://www.deresen.nl/ProgParty/Sample-floor.png'
        }
        let url = 'https://progparty-homey-floorplan.azurewebsites.net/api/AddFloor?code=DZOZHKHYawTcGf/o19ZVi5CAmeciz747E2lWLHmEqQa3PHf1RJHQiQ=='
        url += '&token=' + getToken()
        url += '&order=' + order
        url += '&image=' + image
        url += '&name=' + name

        console.log(url)
        $.get(url, function(json) {
            console.log(`${getDateTime()} - Adding floor worked (${json})`)
            _floors.retrieveAllFloors()
        })
    }

    updateFloor(floorId, name, order, image) {
        let url = 'https://progparty-homey-floorplan.azurewebsites.net/api/UpdateFloor?code=O6ac1A8x8B1i5H55wszVK5WQhsOjXy8k8nsWIn/MpTk9jQyoMgZp/Q=='
        url += '&token=' + getToken()
        url += '&floorId=' + floorId
        url += '&order=' + order
        url += '&image=' + image
        url += '&name=' + name

        console.log(url)
        $.get(url, function(json) {
            console.log(`${getDateTime()} - Updating floor worked (${json})`)
            _floors.retrieveAllFloors()
        })
    }

    deleteFloor(floorId) {
        let url = 'https://progparty-homey-floorplan.azurewebsites.net/api/DeleteFloor?code=n8pqdURM7bxOQW9XyfTq88Kc2NxbQIEdxkzmAuhGljS3zFwiS8bmPQ=='
        url += '&token=' + getToken()
        url += '&floorId=' + floorId

        console.log(url)
        $.get(url, function(json) {
            console.log(`${getDateTime()} - Removing floor worked (${json})`)
            _floors.retrieveAllFloors()
        })
    }

    get activeFloor() {
        return this._activeFloor
    }

    get allFloors() {
        return this._allFloors
    }

    get floorsAreInitialized() {
        return this._floorsAreInitialized
    }
}

var _floors = new Floorplan_Floors()
