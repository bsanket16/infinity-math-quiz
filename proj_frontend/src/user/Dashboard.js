import React from 'react'
import Menu from '../core/Menu'

const Dashboard = () => {

    const board = () => (
        <>
            <div className="row ml-4 pt-2">
                <div className="col-2">
                    <div className="row text-primary mb-3">
                        core
                    </div>
                    <div className="row text-primary mb-2">
                        Class 7
                    </div>
                    <div className="row text-primary mb-2">
                        Class 8
                    </div>
                    <div className="row text-primary mb-2">
                        Class 9
                    </div>
                    <div className="row text-primary mb-2">
                        Class 10
                    </div>
                    <div className="row text-primary mt-3 mb-3">
                        skill
                    </div>
                    <div className="row text-primary mb-2">
                        Accuracy Test
                    </div>
                    <div className="row text-primary mb-2">
                        Logical Practice
                    </div>
                </div>
                <div className="col-9">
                    <div className="row">
                        <button>Start Test</button>
                    </div>
                </div>
            </div>
        </>
    )

    return (
        <>
            < Menu />
            {board()}
        </>
    )
}

export default Dashboard


