import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Logon from './pages/logon'
import LandingPage from './pages/landingpage'

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path='/' exact component={LandingPage} />
                <Route path='/login' exact component={Logon} />
            </Switch>
        </Router>
    );
}


export default Routes