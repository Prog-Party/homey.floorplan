window.addEventListener('load', function() {})

$(document).on('click', '#floorplan_View .single-device', function() {
    const device = $(this)
    const deviceId = $(device).attr('data-device-id')
    if (device.hasClass('device-on')) { _devices.turnDeviceOff(deviceId) } else { _devices.turnDeviceOn(deviceId) }
})

document.addEventListener('onViewChanged', floorplan_renderDevices)
window.addEventListener('resize', floorplan_renderDevices)
document.addEventListener('onDevicesRetrieved', floorplan_renderDevices)

document.addEventListener('onActivateFloor', function(e) {
    console.log(`${getDateTime()} - floorplan: Floor activated, show on view.floorplan`)
    $('#floorplan_CarouselHolder .carousel-item').removeClass('active')
    $(`#floorplan_CarouselHolder .carousel-item[data-floor-id=${_floors.activeFloor.id}]`).addClass('active')
    $('#floorplan_FloorSwitcherMenu .floor-button').removeClass('active')
    $(`#floorplan_FloorSwitcherMenu .floor-button[data-floor-id=${_floors.activeFloor.id}]`).addClass('active')

    floorplan_renderDevices()
}, false)

document.addEventListener('onFloorsRetrieved', function(e) {
    console.log(`${getDateTime()} - floorplan:Floors retrieved`)
    const floorSwitcherMenu = $('#floorplan_FloorSwitcherMenu')
    floorSwitcherMenu.html('')
    $('#floorplan_CarouselHolder').html($('#floorplan_DefaultCarouselTemplate').render())

    _floors.allFloors.forEach(floor => {
        // Voeg de knoppen toe
        floorSwitcherMenu.append($('#floorplan_FloorSwitcherMenuButtonTemplate').render(floor))

        // Opbouwen van de carousel
        $('#floorplan_CarouselHolder .carousel-inner').append($('#floorplan_CarouselItemTemplate').render(floor))
    })

    $('#floorplan_CarouselHolder .carousel').carousel({ interval: 0 })

    if (_floors.allFloors.length === 0) {
        $('#floorplan_View').html("<div class='alert alert-warning' style='margin-left:25%;margin-right:25%'>Please note: configure the floors. <a href='javascript:_viewswitcher.switchToView(\"configfloor_View\")'>Click here to configure the floors.</a></div>")
    }

    floorplan_renderDevices()
}, false)

function floorplan_renderDevices() {
    if (!_floors.floorsAreInitialized || !_devices.devicesAreInitialized) { return }

    if (_floors.allFloors.length === 0) { return }

    if (!_floors._activeFloor) { return }

    console.log(`${getDateTime()} - floorplan: render the devices on the screen.`)

    const currentFloorHtml = $('#floorplan_View .floor-with-devices.active')
    renderDevicesToFloorplan(currentFloorHtml)
}
