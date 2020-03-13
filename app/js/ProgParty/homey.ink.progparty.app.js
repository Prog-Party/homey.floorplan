class ProgParty_App {

  constructor() {
      this.initialize();
  }

  initializeApi(api) { this._api = api; }
  initializeHomey(homey) { this._homey = homey; }

  renderHomey() {
    homey.users.getUserMe().then(function(user) {
      this._me = user;
      me.properties = me.properties || {};
      me.properties.favoriteDevices = me.properties.favoriteDevices || [];
            
      homey.devices.getDevices().then(function(devices) {
        var favoriteDevices = me.properties.favoriteDevices.map(function(deviceId){
          return devices[deviceId];
        }).filter(function(device){
          return !!device;
        }).filter(function(device){
          if(!device.ui) return false;
          if(!device.ui.quickAction) return false;
          return true;
        });
        
        favoriteDevices.forEach(function(device){
          device.makeCapabilityInstance(device.ui.quickAction, function(value){
            var $device = document.getElementById('device-' + device.id);
            if( $device ) {
              $device.classList.toggle('on', !!value);
            }
          });
        });
        
        return renderDevices(favoriteDevices);
      }).catch(console.error);
    }).catch(console.error);
  }

  renderDevices(devices) {
    console.log("ProgParty Render devices");
    // $devicesInner.innerHTML = '';
    // devices.forEach(function(device) {
    //   var $device = document.createElement('div');
    //   $device.id = 'device-' + device.id;
    //   $device.classList.add('device');
    //   $device.classList.toggle('on', device.capabilitiesObj && device.capabilitiesObj[device.ui.quickAction] && device.capabilitiesObj[device.ui.quickAction].value === true);
    //   $device.addEventListener('click', function(){
    //     var value = !$device.classList.contains('on');
    //     $device.classList.toggle('on', value);
    //     homey.devices.setCapabilityValue({
    //       deviceId: device.id,
    //       capabilityId: device.ui.quickAction,
    //       value: value,
    //     }).catch(console.error);
    //   });
    //   $devicesInner.appendChild($device);
      
    //   var $icon = document.createElement('div');
    //   $icon.classList.add('icon');
    //   $icon.style.webkitMaskImage = 'url(https://icons-cdn.athom.com/' + device.iconObj.id + '-128.png)';
    //   $device.appendChild($icon);
      
    //   var $name = document.createElement('div');
    //   $name.classList.add('name');
    //   $name.innerHTML = device.name;
    //   $device.appendChild($name);
    // });
  }

  // get currentNeutralCulture() {
  //     return this.CurrentNeutralCulture;
  // }
}