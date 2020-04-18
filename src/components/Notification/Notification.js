import React, { useState } from 'react'
import './style.css'
import useFetch from '../../services/useFetch'

const Notification = ({ id, sender, project, role, date }) => {
    
    const [getResponse] = useFetch()
    const inviteDate = new Date(date * 1000).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })
    const [gotUserInput,setGotUserInput] = useState(false)

    const handleInput = async input => {
        setGotUserInput(true)
        try {
                await getResponse('post', `/member/${input}`, { notificationId:id })
        }
        catch (err) {
            console.log(err);
            
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
                <button className='accept' onClick={()=>{handleInput('accept')}}>Aceitar</button>
                <button className='deny' onClick={()=>{handleInput('deny')}}>Recusar</button>
            </div>
        </div>
    )
}
export default Notification