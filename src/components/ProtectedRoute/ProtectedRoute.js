import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import CheckAuth from '../../Auth/CheckAuth'


const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={(props) => (
            CheckAuth() ?
                <Component {...props} />
                : localStorage.clear && <Redirect to='/' />
        )} />
    )
}
export default ProtectedRoute