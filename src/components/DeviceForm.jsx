import * as React from 'react'

export const DeviceForm = ({ descriptor, getDescription, handleError }) => {
  const [description, handleInput] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const encoder = new TextEncoder('utf-8')

  const writeCharacteristics = async () => {
    try {
      if (loading || !description) return
      setLoading(true)
      const userDescription = encoder.encode(description)
      await descriptor.writeValue(userDescription)
      await getDescription(descriptor)
      handleInput('')
    } catch (e) {
      handleError(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="description-form">
      <input value={description} onInput={(event) => handleInput(event.target.value)} placeholder="Description"/>
      <button onClick={writeCharacteristics} className={`submit-button ${loading || !description ? 'button-disabled' : ''}`}>
        {loading ? 'Loading...' : 'Change description'}
      </button>
    </div>
  );
}
