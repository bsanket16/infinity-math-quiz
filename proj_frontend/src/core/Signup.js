import React, { useState } from 'react'
import { userSignup } from '../auth'
import Nav from './Nav'

const Signup= () => {

    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        error: '',
        success: false
    })

    const { username, email, password, error, success } = values

    const handleChange = name => event => {
        setValues({...values, error:false, [name]:event.target.value})
    }

    const onSubmit = event => {
        event.preventDefault()
        setValues({...values, error: false})
        userSignup({username, email, password})
        .then((data) => {
            if(data.error){
                setValues({...values, error:data.error, success: false})    
            }
            else{
                setValues({...values,
                username: '',
                email: '',
                password: '',
                error: '',
                success: true
                })
            }
        })
    }

    const successMsg = () => {
        return (
            <>
                <div className="container alert text-center alert-success" style={{display: success ? "" : "none"}}>
                    New Account Created
                </div>
            </>
        )
    }

    const errorMsg = () => {
        return (
                <div className="container alert text-center alert-danger" style={{display: error ? "" : "none"}}>
                    { error }
                </div>
        )
    }

    const signUpForm = () => {
        return (
            <>

                <div className="login container">
                    <div className="row">
                        <div className="card offset-1 col-10 col-md-7 col-lg-5 p-5 shadow-sm ml-md-auto">
                            <div className="card-body">

                                <form className="form-signin" autoComplete='off'>
                                        <h1 className='display-4 mt-3 mb-5 text-dark text-center'>Sign up</h1>

                                        <div className="form-label-group shadow-sm rounded">
                                                <input type="name" id="inputName" className="form-control" placeholder='Name' 
                                                required autoFocus onChange={handleChange("username")} autoComplete="new-name" value= { username } />
                                                <label htmlFor="inputName">Username</label>
                                        </div>
                                        
                                        <div className="form-label-group shadow-sm rounded">
                                            <input value={ email } type="email" id="inputEmail" className="form-control" 
                                            placeholder='Email' required onChange={ handleChange("email") } />
                                            <label htmlFor="inputEmail">Email Id</label>
                                        </div>
                                            
                                        <div className="form-label-group shadow-sm rounded">
                                            <input value={ password } type="password" id="inputPassword" className="form-control mt-1" 
                                            placeholder='Password' required onChange={ handleChange("password") } />
                                            <label htmlFor="inputPassword">Password</label>
                                        </div>
                                            
                                    <button onClick={onSubmit} href='/' className="btn btn-lg mt-4 mb-2 btn-block text-white shadow-sm rounded form-btn" type='submit'> Log In </button>
                                            
                                    {errorMsg()}
                                    {successMsg()}    

                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <Nav />
            {signUpForm()}
        </>
    )
}

export default Signup



