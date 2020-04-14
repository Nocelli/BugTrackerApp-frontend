import React from 'react'
import { Redirect } from 'react-router-dom'
import './style.css'

const LandingPage = () => {

    function handleRedirect() {
        const token = localStorage.getItem('x-token')
        const tokenRefresh = localStorage.getItem('x-token-refresh')
        if (token && tokenRefresh)
            return <Redirect to='/dashboard' />
    }

    return (
        <>
            {handleRedirect()}
        </>
    )
    
}

export default LandingPage