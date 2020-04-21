import React, { useState, useEffect, useCallback } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import handleLogon from './services/socketHandler'
import CheckAuth from './Auth/CheckAuth'
import { ErrorContext } from './errors/ErrorContext'
import { AuthContext } from './Auth/AuthContext'
import ErrorRenderer from './components/ErrorRenderer/ErrorRenderer'

import Logon from './pages/logon'
import LandingPage from './pages/landingpage'
import Dashboard from './pages/dashboard'
import Register from './pages/register'
import Confirmations from './pages/confirmations'
import ConfirmedEmail from './pages/confirmedEmail'
import ResetPassword from './pages/resetPassword'
import NewPassword from './pages/newPassord'
import NewProject from './pages/newProject'
import ProjectPage from './pages/projectPage'
import NewTicket from './pages/newTicket'
import Page404 from './pages/404page'

let socket
const Routes = () => {

    const [newNotification, setNewNotification] = useState(false)
    const [isAuth, setAuth] = useState(CheckAuth())
    const [errors, setErrors] = useState(null)
    const setIsAuth = () => setAuth(CheckAuth())
    const handleSocket = useCallback(() => {
        if (!socket && isAuth)
            socket = handleLogon()

        if (socket) {
            if (!isAuth)
                socket.disconnect()
                
            socket.on("FromAPI", data => setNewNotification(data > 0 ? data : null))
        }
    }, [isAuth])

    useEffect(() => {
        document.body.scrollTo(0, 0)
    }, [errors])

    useEffect(() => {
        handleSocket()
    }, [handleSocket])

    return (
        <Router>
            <ErrorContext.Provider value={{ setErrors: setErrors }}>
                <AuthContext.Provider value={{ setAuth: setIsAuth, isAuth: isAuth}}>
                    <NavBar setNewNotification={setNewNotification} newNotification={newNotification} />
                    <ErrorRenderer errors={errors} />
                    <Switch>
                        <Route path='/' exact component={LandingPage} />
                        <Route path='/login' exact component={Logon} />
                        <Route path='/register' exact component={Register} />
                        <Route path='/confirmations' exact component={Confirmations} />
                        <Route path='/confirmed/:token' exact component={ConfirmedEmail} />
                        <Route path='/password' exact component={ResetPassword} />
                        <Route path='/password/new/:token' exact component={NewPassword} />
                        <ProtectedRoute path='/dashboard' exact component={Dashboard} />
                        <ProtectedRoute path='/project/new' exact component={NewProject} />
                        <ProtectedRoute path='/project/:projectId' exact component={ProjectPage} />
                        <ProtectedRoute path='/project/:projectId/ticket/new' exact component={NewTicket} />
                        <Route exact component={Page404} />
                    </Switch>
                </AuthContext.Provider>
            </ErrorContext.Provider>
        </Router>
    );
}


export default Routes