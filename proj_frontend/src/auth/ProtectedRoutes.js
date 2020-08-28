import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isAuth } from '../helpers/auth'

// import { isAuthenticated } from './index'

const ProtectedRoutes = ({ component : Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props =>
                isAuth() ? (
                    (
                        <Redirect
                            to={{
                                pathname: "/user/dashboard",
                                state: { from: props.location }
                            }}
                        />
                    )
                ) : 
                <Component {...props} />
            }
        />
    )
}

export default ProtectedRoutes

