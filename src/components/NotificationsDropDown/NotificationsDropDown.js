import React from 'react'
import Notification from '../../components/Notification/Notification'
import { FiX as Close } from "react-icons/fi";
import './style.css'

const NotificationsDropDown = ({ notifications, setShowing }) => {


    return (
        <div className='notifications'>
            <div className='notifications-holder'>
                <div className='notifications-menu-title'>
                    <Close className='close-notifications' onClick={() => setShowing(false)} ></Close>
                    <h1>Notificações</h1>
                    <h2>Suas notificações serão mostradas aqui</h2>
                </div>
                {notifications.map((notification, index) => (
                    <Notification
                        id={notification.notification_id}
                        sender={notification.senders_name}
                        project={notification.project_name}
                        role={notification.role_name}
                        date={notification.notification_creationdate}
                        key={index} />))}
            </div>
        </div>
    )
}
export default NotificationsDropDown