import React from 'react'
import './style.css'

const NotificationsRenderer = ({ notifications }) => {
    const showNotifications = () =>(
        notifications ? 
        <div className='notification-message'>
                {notifications}
        </div> : null
    )
    return(
    <>
        {showNotifications(notifications)}
    </>
    )
}

export default NotificationsRenderer
