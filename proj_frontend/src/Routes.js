import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'

import Login from './core/Login'
import Signup from './core/Signup'
import Dashboard from './user/Dashboard'

import PrivateRoutes from './auth/PrivateRoutes'
import ProtectedRoutes from './auth/ProtectedRoutes'

const Routes = () => {
    return (
        <HashRouter>
            <Switch>

                <Route path='/' exact component={ Login } />
                <Route path='/signup' exact component={ Signup } />
                <Route path='/dashboard' exact component={ Dashboard } />
                
            </Switch>
        </HashRouter>
    )
}

export default Routes