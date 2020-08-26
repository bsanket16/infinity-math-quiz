import React from 'react'
import { HashRouter, Switch } from 'react-router-dom'

import Login from './core/Login'
import Signup from './core/Signup'
import Dashboard from './user/Dashboard'

import PrivateRoutes from './auth/PrivateRoutes'
import ProtectedRoutes from './auth/ProtectedRoutes'

const Routes = () => {
    return (
        <HashRouter>
            <Switch>

                <ProtectedRoutes path='/' exact component={ Login } />
                <ProtectedRoutes path='/signup' exact component={ Signup } />
                <PrivateRoutes path='/dashboard' exact component={ Dashboard } />
                
            </Switch>
        </HashRouter>
    )
}

export default Routes