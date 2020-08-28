import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isAuth } from '../helpers/auth'

// import { isAuthenticated } from './index'


const PrivateRoutes = ({ component : Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props =>
                isAuth() ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/auth/login",
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    )
}

export default PrivateRoutes