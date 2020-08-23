import React from 'react'

const Nav = () => {
    return (
        <>
            <div className="nav">
                    <div className="text-white ml-4 pl-4 pt-4 mt-3 d-none d-lg-block">
                        <i className="logo las la-infinity la-3x"></i>
                    </div>

                    <div className="text-white ml-4 pl-4 pt-3 mt-2 d-none d-md-block d-lg-none">
                        <i className="logo las la-infinity la-3x"></i>
                    </div>

                    <div className="text-white ml-auto mr-auto p-2 mt-1 d-none d-sm-block d-md-none">
                        <i className="logo las la-infinity la-3x"></i>
                    </div>

                    <div className="text-white ml-auto mr-auto p-2 mt-2 d-block d-sm-none">
                        <i className="logo las la-infinity la-2x"></i>
                    </div>
            </div>
        </>
    )
}

export default Nav
