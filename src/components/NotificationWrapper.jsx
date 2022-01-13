import * as React from 'react'

export const NotificationWrapper = ({ message }) => {
  const [isVisible, setVisible] = React.useState(false)

  React.useEffect(() => {
    if (message) {
      setVisible(true)
      setTimeout(() => setVisible(false), 5000)
    }
  }, [message])

  return (
    <div className={`notification-wrapper ${isVisible ? 'notification-wrapper-visible' : ''}`}>
      {message}
    </div>
  )
}
