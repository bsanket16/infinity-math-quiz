import React, {useState} from 'react'
import { Redirect } from 'react-router-dom'
import { userLogin } from '../auth'
import { isAuth, authenticate } from '../helpers/auth'
import { GoogleLogin } from 'react-google-login'
import axios from 'axios'
import Nav from './Nav'

const Login= () => {

    const [ values, setValues ] = useState({
        email: 's@gmail.com',
        password: 'sanket',
        error: '',
        loading: false,
        didRedirect: false
    })

    const { email, password, error, loading, didRedirect } = values

    const handleChange = name => event => {
        setValues({ ...values, error:false, [name]:event.target.value })
    }

    const sendGoogleToken = tokenId => {
        axios
            .post(`${process.env.REACT_APP_API_URL}/googlelogin`, {
            idToken: tokenId
        })
            .then(res => {
            console.log(res.data)
            informParent(res);
        })
            .catch(error => {
            console.log('GOOGLE SIGN IN ERROR', error.response)
        });
    }
    const informParent = response => {
        authenticate(response, () => {
        isAuth() && isAuth().role === 'admin'
            ? console.log('object')
            : console.log('object')
        })
    }

    const responseGoogle = response => {
        console.log(response)
        sendGoogleToken(response.tokenId)
    }

    const onSubmit = event => {     
        event.preventDefault()
        setValues({...values, error: false, loading: false})
        userLogin({email, password})
        .then((data) => {
            if(data.error){
                setValues({...values, error:data.error, loading: false})
            }
            else{
                authenticate(data, () => {
                    setValues({...values,
                        email: '',
                        password: '',
                        error: '',
                        loading: true,
                        didRedirect: true})
                })
            }
        })
        .catch((err) => {
            console.log('Login Request Failed')
        })
    }

    const performRedirect = () => {
        if(didRedirect){
                return <Redirect to='/user/dashboard' />
        }
    }

    const loadingMsg = () => {
        return (
            loading && (
                <div className="container alert alert-info">
                    Loading...
                </div>
            )
        )
    }

    const errorMsg = () => {
        return (
                <div className="container alert text-center alert-danger" style={{display: error ? "" : "none"}}>
                    { error }
                </div>
        )
    }

    const signInForm = () => {
        return (
            <>

                <div className="login container">
                    <div className="row">
                        <div className="card offset-1 col-10 col-md-7 col-lg-5 p-5 shadow-sm ml-md-auto">
                            <div className="card-body">

                                <form className="form-signin" autoComplete='off'>
                                        <h1 className='display-4 mt-3 mb-5 text-dark text-center'>Login</h1>
                                        
                                        <div className="form-label-group shadow-sm rounded">
                                            <input value={ email } type="email" id="inputEmail" className="form-control" 
                                            placeholder='Email' required autoFocus onChange={ handleChange("email") } />
                                            <label htmlFor="inputEmail">Email Id</label>
                                        </div>
                                            
                                        <div className="form-label-group shadow-sm rounded">
                                            <input value={ password } type="password" id="inputPassword" className="form-control mt-1" 
                                            placeholder='Password' required onChange={ handleChange("password") } />
                                            <label htmlFor="inputPassword">Password</label>
                                        </div>
                                            
                                    <button onClick={onSubmit} href='/' className="btn btn-lg mt-4 mb-2 btn-block text-white bg-dark shadow-sm rounded form-btn" type='submit'> Log In </button>
                                    
                                            
                                    {errorMsg()}
                                    {loadingMsg()}  

                                </form>

                                {/* <a href='http://localhost:3001/auth/google' className="btn btn-lg mt-4 mb-2 btn-block text-white bg-danger shadow-sm rounded form-btn"> Sign in with <i className="lab la-google-plus-g la-lg"></i> </a> */}

                                <GoogleLogin
                                    clientId={`${process.env.REACT_APP_GOOGLE_CLIENT}`}
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    cookiePolicy={'single_host_origin'}
                                    render={renderProps => (
                                        <button
                                        onClick={renderProps.onClick}
                                        disabled={renderProps.disabled}
                                        className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline'
                                        >
                                        <div className=' p-2 rounded-full '>
                                            <i className='fab fa-google ' />
                                        </div>
                                        <span className='ml-4'>Sign In with Google</span>
                                        </button>
                                    )}
                                ></GoogleLogin>

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
            {signInForm()}
            {performRedirect()}
        </>
    )
}

export default Login
