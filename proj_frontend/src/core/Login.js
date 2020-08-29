import React, {useState} from 'react'
import { Redirect, Link } from 'react-router-dom'
import { userLogin } from '../auth'
import { isAuth, authenticate, authenticated } from '../helpers/auth'
import { GoogleLogin } from 'react-google-login'
import axios from 'axios'
import Nav from './Nav'
import '../styles.css'

const Login= () => {

    const [ values, setValues ] = useState({
        email: '',
        password: '',
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
        authenticated(response, () => {
        isAuth()
            ? setValues({...values, didRedirect:true})
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
            console.log(err)
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
                <div className="container alert text-center alert-danger mt-3" style={{fontSize:'0.9rem', display: error ? "" : "none"}}>
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
                                        {/* <h1 className='display-4 mt-3 mb-5 text-dark text-center'>Login</h1> */}
                                        
                                        <div className="form-label-group shadow-sm rounded">
                                            <input value={ email } type="email" id="inputEmail" className="form-control" 
                                            placeholder='Email' required autoFocus onChange={ handleChange("email") } />
                                            <label htmlFor="inputEmail">email</label>
                                        </div>
                                            
                                        <div className="form-label-group shadow-sm rounded">
                                            <input value={ password } type="password" id="inputPassword" className="form-control mt-3" 
                                            placeholder='Password' required onChange={ handleChange("password") } />
                                            <label htmlFor="inputPassword">password</label>
                                        </div>

                                        <div className="signup mb-2">
                                            <span className="text-primary float-right mr-2">
                                                <Link to='/auth/signup'>new here?</Link>
                                            </span>
                                        </div>
                                            
                                    <button onClick={onSubmit} href='/' className="btn btn-login btn-lg mt-5 p-2 mb-3 btn-block text-white bg-dark shadow-sm rounded form-btn" type='submit'> Log In </button>
                                    
                                            
                                <GoogleLogin
                                    clientId={`${process.env.REACT_APP_GOOGLE_CLIENT}`}
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    cookiePolicy={'single_host_origin'}
                                    render={renderProps => (
                                        <button
                                        onClick={renderProps.onClick}
                                        disabled={renderProps.disabled}
                                        className=' container btn btn-lg btn-google btn-block text-white bg-danger shadow-sm rounded'
                                        >
                                        <div className="google-btn">
                                            <i className='lab la-google-plus la-lg text-center pt-1' />
                                            <span className="ml-3">Sign In with Google </span>
                                        </div>
                                        </button>
                                    )}
                                ></GoogleLogin>

                                    {errorMsg()}
                                    {loadingMsg()}  

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
            {signInForm()}
            {performRedirect()}
        </>
    )
}

export default Login
