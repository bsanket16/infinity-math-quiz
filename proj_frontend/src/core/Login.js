import React from 'react'
import Nav from './Nav'

const Login = () => {

    const loginForm = () => (
        <>
            <h1>Hello there!</h1>
        </>
    )

    return (
        <>
            <Nav />
            {loginForm()}
        </>
    )
}

export default Login
