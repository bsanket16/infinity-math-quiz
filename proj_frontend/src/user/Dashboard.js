import React from 'react'
import Menu from '../core/Menu'

const Dashboard = () => {

    const board = () => (
        <>
            <div class="container-fluid">
                <div class="row">
                    <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light shadow-sm text-dark sidebar collapse">
                    <div class="sidebar-sticky pt-3">
                    
                    <ul class="sidebar-menu flex-column text-dark">
                        <li className="core text-primary">
                            <span>core</span>
                        </li>
                        <li class="nav-item">
                            <i class="las la-book la-lg"></i>
                            <span className="ml-2">Class 7 </span>
                        </li>
                        <li class="nav-item">
                            <i class="las la-book la-lg"></i>
                            <span className="ml-2">Class 8 </span>
                        </li>
                        <li class="nav-item">
                            <i class="las la-book la-lg"></i>
                            <span className="ml-2">Class 9 </span>
                        </li>
                        <li class="nav-item">
                            <i class="las la-book la-lg"></i>
                            <span className="ml-2">Class 10 </span>
                        </li>
                    </ul>

                    <ul class="sidebar-menu flex-column text-dark mt-4">
                        <li className="core text-primary">
                            <span>skill</span>
                        </li>

                        <li class="nav-item">
                            <i class="las la-brain la-lg"></i>
                            <span className="ml-2">Logical </span>
                        </li>
                        <li class="nav-item">
                            <i class="las la-tachometer-alt la-lg"></i>
                            <span className="ml-2">Accuracy </span>
                        </li>
                        <li class="nav-item">
                            <i class="las la-stream la-lg"></i>
                            <span className="ml-2">Categories </span>
                        </li>

                    </ul>
                
                    </div>
                    </nav>

                    <main role="main" class="main col-md-9 ml-sm-auto col-lg-10 px-md-4 no-gutters">
                    <div class="banner pt-5 pb-2 mb-3 text-white">
                        <h1 class="h1 ml-5">Dashboard</h1>   
                        <div className="text-white ml-5">
                            Keep exploring newly added categories and tests
                        </div>

                        <div className="calendar float-right bg-white text-dark p-2 mr-5 rounded">
                            <i class="las la-calendar la-lg p-1"></i>
                                <span className="ml-3">Aug 29 Saturday</span>
                            </div>
                    </div>

                    <div className="start-test bg-white shadow rounded text-dark ml-3 mr-3">
                        <div className="text-1 d-flex justify-content-center text-grey text-center">
                            <span className="practice pt-4 mt-3">Practice Test : <span className="math">Mathematics</span></span>
                            <h5> <span class="badge badge-danger mt-5  ml-3">new</span></h5>
                        </div>

                        <div className="test-desc container pl-5 pr-5 mt-3 text-grey text-center text-justify">
                            This is a mathematics practice test. It contains 20 multiple choice questions, you will score marks according
                            to the number of correct answers you solve. The practice test should be solved by students in class 7 or class 8.
                        </div>

                        <div className="text-primary mt-4 text-center"> 
                            You can take this test till 3 September 2020
                        </div>

                        <div className="container row d-flex justify-content-center">
                            <button href='/' className="btn btn-login col-5 btn-lg mt-4 ml-4 mb-4 p-2 mb-3 btn-block text-white bg-dark shadow-sm rounded"> Attempt this test now </button>
                        </div>
                    </div>
                    </main>
                </div>
            </div>
        </>
    )

    return (
        <>
            <Menu />
            {board()}
        </>
    )
}

export default Dashboard


