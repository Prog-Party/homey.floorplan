$(function() {
    initDataLoader();
    
    var is_dark_mode = isDarkMode()
    if(is_dark_mode) {
        $("html").attr("theme", "dark-mode")
    }
    else if(!is_dark_mode || is_dark_mode == undefined) {
        $("html").removeAttr("theme")
    }
    
    later.setInterval(function(){
        //reload the page every hour
        location.reload();
    }, later.parse.text('every 1 hour'));
});

function sortByName(nameA, nameB) {
    return nameA < nameB ? -1 : (nameA > nameB ? 1 : 0);
}

function sortByNullable(objectA, objectB) {
    if(objectA == null && objectB != null)
        return -1;
    return 1;
}

function getToken() {
    var urlParams = new URLSearchParams(window.location.search);
    var token = urlParams.get("token");
    return token;
}

function isDarkMode() {
    var urlParams = new URLSearchParams(window.location.search);
    var isDarkMode = urlParams.get("darkmode");
    return isDarkMode;
}

function renderDevicesToFloorplan(currentFloorHtml) {
    console.log("Try render the devices to the floorplan");
    var deviceHolder = $(currentFloorHtml).find(".device-holder");
    
    //get the height and width of the img
    var currentFloor = _floors.activeFloor;

    deviceHolder.html("");
    var floorImage = $(currentFloorHtml).find("img");
    deviceHolder.height(floorImage.height());
    deviceHolder.width(floorImage.width());

    if(!_devices.allFloorplanDevices || !currentFloor || !_devices._devicesAreInitialized)
        return;


    _devices.allFloorplanDevices.filter(device => device.floorId == currentFloor.id).forEach(floorplanDevice => {
        var homeyDevice = _devices.getHomeyDevice(floorplanDevice);
        if(homeyDevice == null)
            return;
        
        var data = {homeyDevice, floorplanDevice};
        deviceHolder.append($("#SingleDeviceTemplate").render(data));
    });
}

function initDataLoader()
{
    var img = (loadId) => `<img src="/img/loader.gif" height="10px" id="LoadOnSubmit" class="load-on-submit w32" data-load-id="${loadId}" />`;
    $(document).on("click", "a[data-loader],input[data-loader],button[data-loader]", function () {
        $(this).after(img($(this).data("loader")));
        $(this).hide();
    });

    $(document).on("change", "select[data-loader]", function () {
        $(this).after(img($(this).data("loader")));
        $(this).hide();
    });
} 

function removeLoader(loadid)
{
    if(loadid && loadid.length > 0)
    {
        //remove loader
        $(`.load-on-submit[data-load-id='${loadid}']`).remove();

        var button = $(`a[data-loader='${loadid}'],input[data-loader='${loadid}'],button[data-loader='${loadid}'],select[data-loader='${loadid}']`);
        $(button).show();
    } else {
        $("#LoadOnSubmit").remove();
    }
}

function getDateTime() {
    var currentDate = new Date();

    var date = currentDate.getDate();
    var month = currentDate.getMonth(); //Be careful! January is 0 not 1
    var year = currentDate.getFullYear();

    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var seconds = currentDate.getSeconds();

    return `${date}-${month + 1}-${year} ${hours}:${minutes}:${seconds}`;
}