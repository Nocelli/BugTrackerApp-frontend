import React, { useEffect, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import './style.css'
import { AuthContext } from '../../Auth/AuthContext'

const LandingPage = () => {
    const { setAuth } = useContext(AuthContext)

    useEffect(()=>{
        setAuth()
    },[setAuth])

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