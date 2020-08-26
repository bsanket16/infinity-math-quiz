import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isAuthenticated } from './index'

const ProtectedRoutes = ({ component : Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated() ? (
                    (
                        <Redirect
                            to={{
                                pathname: "/dashboard",
                                state: { from: props.location }
                            }}
                        />
                    )
                ) : 
                <Component {...props} />
            }
        />
    );
}

export default ProtectedRoutes

