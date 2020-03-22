$(function() {
    initDataLoader();
});

function getToken() {
    var urlParams = new URLSearchParams(window.location.search);
    var token = urlParams.get("token");
    return token;
}

function renderDevicesToFloorplan(currentFloorHtml) {
    var deviceHolder = $(currentFloorHtml).find(".device-holder");
    
    //get the height and width of the img
    var currentFloor = _floors.activeFloor;

    deviceHolder.html("");
    var floorImage = $(currentFloorHtml).find("img");
    deviceHolder.height(floorImage.height());
    deviceHolder.width(floorImage.width());

    _devices.allFloorplanDevices.filter(device => device.floorId == currentFloor.id).forEach(floorplanDevice => {
        var homeyDevice = _devices.getHomeyDevice(floorplanDevice);
        var data = {homeyDevice, floorplanDevice};
        //console.log(`Add device ${homeyDevice.name} to configdevice viewer`);
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