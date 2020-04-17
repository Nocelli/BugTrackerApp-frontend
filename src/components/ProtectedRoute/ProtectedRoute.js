import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import checkAuth from '../../Auth/CheckAuth'

const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={(props) => (
            checkAuth() ?
                <Component {...props} />
                : <Redirect to='/' />
        )} />
    )
}
export default ProtectedRoute