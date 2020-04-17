import React, { useState } from 'react'
import api from '../../services/api'
import './style.css'

const Notification = ({ id, sender, project, role, date }) => {
    
    const token = localStorage.getItem('x-token')
    const tokenRefresh = localStorage.getItem('x-token-refresh')
    const inviteDate = new Date(date * 1000).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })
    const [gotUserInput,setGotUserInput] = useState(false)

    const handleAccept = async () => {
        setGotUserInput(true)
        try {
            const response = await api.post(`/member/accept`, { notificationId:id },{ headers: { 'x-token': token, 'x-token-refresh': tokenRefresh }})
            if(response.headers['x-token'])
                localStorage.setItem('x-token', response.headers['x-token'])
        }
        catch (err) {
            const { response } = err;

            if(response && response.status === 401){
                console.log(response)
                localStorage.clear()
            }
        }
    }

    const handleDeny = async () => {
        setGotUserInput(true)
        try {
            const response = await api.post(`/member/deny`, { notificationId:id },{ headers: { 'x-token': token, 'x-token-refresh': tokenRefresh }})
            if(response.headers['x-token'])
                localStorage.setItem('x-token', response.headers['x-token'])
        }
        catch (err) {
            const { response } = err;

            if(response && response.status === 401){
                console.log(response)
                localStorage.clear()
            }
        }
    }

    return (
        <div className={gotUserInput ? 'hidden' : 'notification-container'}>
            <h3>{inviteDate}</h3>
            <span className='notification-text'>
                <h1>{sender}</h1>
                <h2>convidou você para entrar no projeto: </h2>
                <h1>{`"${project}"`}</h1>
                <h2>como um: </h2>
                <h1>{`"${role}"`}</h1>
            </span>
            <div className='buttons'>
                <button className='accept' onClick={handleAccept}>Aceitar</button>
                <button className='deny' onClick={handleDeny}>Recusar</button>
            </div>
        </div>
    )
}
export default Notification