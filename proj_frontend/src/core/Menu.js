import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { logout } from '../auth/index'

const Menu = ({ history }) => (
    <>
        <div className="navbar navbar-light fixed-top shadow-sm">
            <div className="container-fluid">
                <span className="navbar-brand">
                    <Link to='#' className='text-white'>
                        <i className="logo las la-infinity la-lg"></i>
                    </Link>
                </span>

                <ul className="navigation mt-3" style={{listStyle: 'none'}}>

                            <li className="nav-item">
                                <span className='nav-link' style={{color:'#A9A9A9', cursor:'pointer'}} onClick={() => {
                                    logout(() => {
                                        history.push('/')
                                    })
                                }}> 
                                    <i className="logo las la-sign-out-alt text-white la-lg"></i> 
                                </span>
                            </li>

                </ul> 

            </div>
        </div>
    </>
)

export default withRouter(Menu)