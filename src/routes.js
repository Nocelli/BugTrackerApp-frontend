import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

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
import Page404 from './pages/404page'

const Routes = () => {
    return (
        <Router>
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
                <Route exact component={Page404} />
            </Switch>
        </Router>
    );
}


export default Routes