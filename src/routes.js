import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import handleLogon from './services/socketHandler'
import checkAuth from './Auth/CheckAuth'
import { ErrorContext } from './errors/ErrorContext'
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

const Routes = () => {

    let socket
    const [notification, setNotification] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(checkAuth())
    const [errors, setErrors] = useState(null)

    function handleSocket() {
        if (!socket)
            socket = handleLogon()

        if (socket) {
            socket.on("FromAPI", data => setNotification(data > 0 ? data : null))

            if (!isAuthenticated)
                socket.disconnect()
        }
    }

    useEffect(() => {
        document.body.scrollTo(0, 0)
    }, [errors])

    useEffect(() => {
        handleSocket()
    }, [isAuthenticated])

    return (
        <Router>
            <ErrorContext.Provider value={{ setErrors: setErrors }}>
                <NavBar setNotification={setNotification} setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} notification={notification} />
                <ErrorRenderer errors={errors} />
                <Switch>
                    <Route path='/' exact component={LandingPage} />
                    <Route path='/login' exact component={() => (<Logon setIsAuthenticated={setIsAuthenticated} />)} />
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
            </ErrorContext.Provider>
        </Router>
    );
}


export default Routes