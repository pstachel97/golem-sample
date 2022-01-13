import * as React from 'react';

export const DeviceInfo = () => {
  const handleBt = () => {
    navigator.bluetooth.requestDevice({ filters: [{ services: ['battery_service'] }] })
      .then(device => {
        console.log({ device });
        return device;
      })
      .then(device => device.gatt.connect())
      .then(server => {
        // Getting Battery Service…
        console.warn('battery_service');
        return server.getPrimaryService('battery_service');
      })
      .then(service => {
        // Getting Battery Level Characteristic…
        console.warn('battery_level');
        return service.getCharacteristic('battery_level');
      })
      .then(characteristic => {
        // Set up event listener for when characteristic value changes.
        characteristic.addEventListener('characteristicvaluechanged',
          handleBatteryLevelChanged);
        // Reading Battery Level…
        return characteristic.readValue();
      })
      .then(value => {
        console.log(`Battery percentage is ${value.getUint8(0)}`);
      })
      .catch(error => {
        console.error(error);
      });
  };

  function handleBatteryLevelChanged(event) {
    const batteryLevel = event.target.value.getUint8(0);
    console.log('Battery percentage is ' + batteryLevel);
  }

  return (
    <div>
      <button onClick={handleBt}>
        connect
      </button>
    </div>
  );
};
