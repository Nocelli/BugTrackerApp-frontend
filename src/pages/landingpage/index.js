import React from 'react'
import { Redirect } from 'react-router-dom'
import './style.css'

import NavBar from '../../components/NavBar/NavBar'

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
            <NavBar/>
        </>
    )
    
}

export default LandingPage