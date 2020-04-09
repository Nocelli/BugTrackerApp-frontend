import React from 'react'
import { Redirect, Route } from 'react-router-dom'
var Decode = require('jwt-decode')



const ProtectedRoute = ({ component: Component, ...rest }) => {

    function checkAuth() {
        const token = localStorage.getItem('x-token')
        const tokenRefresh = localStorage.getItem('x-token-refresh')

        if (!token || !tokenRefresh)
            return false

        try {
            const { exp } = Decode(tokenRefresh)
            if ((Math.floor(exp * 1000)) < new Date().getTime())
                return false
        } catch (error) {
            return false
        }
        return true
    }


    return (
        <Route {...rest} render={(props) => (
            checkAuth() ?
                <Component {...props} />
                : <Redirect to='/login' />
        )} />
    )
}
export default ProtectedRoute