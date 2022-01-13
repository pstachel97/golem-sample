import * as React from 'react'
import { DeviceForm } from '../components/DeviceForm'
import { NotificationWrapper } from '../components/NotificationWrapper'

export const Home = () => {
  const [connectedDevice, setConnectedDevice] = React.useState()
  const [descriptor, setDescriptor] = React.useState()
  const [description, setDescription] = React.useState()
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')

  const handleBt = async () => {
    if (loading) return
    try {
      setLoading(true)
      const device = await navigator.bluetooth.requestDevice({ filters: [{ services: ['health_thermometer'] }] })
      const server = await device.gatt.connect()


      const primaryService = await server.getPrimaryService('health_thermometer')

      const characteristic = await primaryService.getCharacteristic('measurement_interval')

      const descriptor = await characteristic.getDescriptor('gatt.characteristic_user_description')

      device.addEventListener('gattserverdisconnected', onDisconnected)

      setDescriptor(descriptor)
      setConnectedDevice(device)

      getDescription(descriptor)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  const getDescription = async (descriptor) => {
    try {
      const value = await descriptor.readValue()
      const decoder = new TextDecoder('utf-8')
      setDescription(decoder.decode(value))
    } catch (error) {
      setError(error)
    }
  }

  const handleLogout = () => {
    connectedDevice.gatt.disconnect()
  }

  const onDisconnected = () => {
    setError({ message: 'Device disconnected' })
    setConnectedDevice(null)
  }

  return (
    <div className="page-wrapper">
      <NotificationWrapper message={error?.message}/>
      {connectedDevice ?
        (<div className="device-info">
          <p>Device: {connectedDevice && connectedDevice.name}</p>
          <p>Descritpion: {description}</p>
          <DeviceForm descriptor={descriptor} getDescription={getDescription} handleError={setError}/>
          <button onClick={handleLogout} className="submit-button">Disconnect</button>
        </div>) : (<button onClick={handleBt} className={loading ? 'button-disabled' : ''}>
          {loading ? 'Connecting...' : 'Connect'}
        </button>)}
    </div>
  )
}
