import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
    return (
        <>
            <div className="nav">
                    <div className="text-white ml-4 pl-4 pt-4 mt-3 d-none d-lg-block">
                    <Link to='/' style={{color:'#ffffff'}}>
                        <i className="logo las la-infinity la-3x"></i>
                        </Link>
                    </div>

                    <div className="text-white ml-4 pl-4 pt-3 mt-2 d-none d-md-block d-lg-none">
                    <Link to='/'>
                        <i className="logo las la-infinity la-3x"></i>
                        </Link>
                    </div>

                    <div className="text-white ml-auto mr-auto p-2 mt-1 d-none d-sm-block d-md-none">
                    <Link to='/'>
                        <i className="logo las la-infinity la-3x"></i>
                        </Link>
                    </div>

                    <div className="text-white ml-auto mr-auto p-2 mt-2 d-block d-sm-none">
                    <Link to='/'>
                        <i className="logo las la-infinity la-2x"></i>
                        </Link>
                    </div>
            </div>
        </>
    )
}

export default Nav
