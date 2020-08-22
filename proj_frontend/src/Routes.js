import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'

import Login from './core/Login'
import Signup from './core/Signup'

const Routes = () => {
    return (
        <HashRouter>
            <Switch>
                <Route path='/' exact component={ Login } />
                <Route path='/signup' exact component={ Signup } />
            </Switch>
        </HashRouter>
    )
}

export default Routes