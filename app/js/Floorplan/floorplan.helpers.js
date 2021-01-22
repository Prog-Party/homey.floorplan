$(function() {
    if (!hasToken()) {
        $('#floorplan_View').html($('#floorplan_TokenMissingTemplate').render())
    }

    initDataLoader()

    if (isDarkMode()) {
        $('html').attr('theme', 'dark-mode')
    }

    later.setInterval(function() {
        // reload the page every hour
        location.reload()
    }, later.parse.text('every 1 hour'))
})

function sortByName(nameA, nameB) {
    return nameA < nameB ? -1 : (nameA > nameB ? 1 : 0)
}

function sortByNullable(objectA, objectB) {
    if (objectA == null && objectB != null) { return -1 }
    return 1
}

function getToken() {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')
    return token
}

function hasToken() {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')
    return token.length != 0
}

function isDarkMode() {
    const urlParams = new URLSearchParams(window.location.search)
    const isDarkMode = urlParams.get('darkmode')
    return isDarkMode
}

function constructUrl() {
    return `${document.location.origin}/?theme=floorplan&token=${getToken()}`
}

function renderDevicesToFloorplan(currentFloorHtml) {
    console.log('Try render the devices to the floorplan')
    const deviceHolder = $(currentFloorHtml).find('.device-holder')

    // get the height and width of the img
    const currentFloor = _floors.activeFloor

    deviceHolder.html('')
    const floorImage = $(currentFloorHtml).find('img')
    deviceHolder.height(floorImage.height())
    deviceHolder.width(floorImage.width())

    if (!_devices.allFloorplanDevices || !currentFloor || !_devices._devicesAreInitialized) { return }

    _devices.allFloorplanDevices.filter(device => device.floorId == currentFloor.id).forEach(floorplanDevice => {
        const homeyDevice = _devices.getHomeyDevice(floorplanDevice)
        if (homeyDevice == null) { return }

        const data = { homeyDevice, floorplanDevice }
        deviceHolder.append($('#SingleDeviceTemplate').render(data))
    })
}

function initDataLoader() {
    const img = (loadId) => `<img src="/img/loader.gif" height="10px" id="LoadOnSubmit" class="load-on-submit w32" data-load-id="${loadId}" />`
    $(document).on('click', 'a[data-loader],input[data-loader],button[data-loader]', function() {
        $(this).after(img($(this).data('loader')))
        $(this).hide()
    })

    $(document).on('change', 'select[data-loader]', function() {
        $(this).after(img($(this).data('loader')))
        $(this).hide()
    })
}

function removeLoader(loadid) {
    if (loadid && loadid.length > 0) {
        // remove loader
        $(`.load-on-submit[data-load-id='${loadid}']`).remove()

        const button = $(`a[data-loader='${loadid}'],input[data-loader='${loadid}'],button[data-loader='${loadid}'],select[data-loader='${loadid}']`)
        $(button).show()
    } else {
        $('#LoadOnSubmit').remove()
    }
}

function getDateTime() {
    const currentDate = new Date()

    const date = currentDate.getDate()
    const month = currentDate.getMonth() // Be careful! January is 0 not 1
    const year = currentDate.getFullYear()

    const hours = currentDate.getHours()
    const minutes = currentDate.getMinutes()
    const seconds = currentDate.getSeconds()

    return `${date}-${month + 1}-${year} ${hours}:${minutes}:${seconds}`
}