import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

import Logon from './pages/logon'
import LandingPage from './pages/landingpage'
import Dashboard from './pages/dashboard'
import Register from './pages/register'

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path='/' exact component={LandingPage} />
                <Route path='/login' exact component={Logon} />
                <Route path='/register' exact component={Register} />
                <ProtectedRoute path='/dashboard' exact component={Dashboard} />
            </Switch>
        </Router>
    );
}


export default Routes