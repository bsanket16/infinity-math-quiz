import React from 'react'
import axios from 'axios'
import Menu from '../core/Menu'
import { Link } from 'react-router-dom'

class Quiz extends React.Component {
    
    //initial state
    constructor (props, context) {
        super(props, context)
        this.state = {
            currentQuizIndex: 0,
            questions: [],
            answers: [],
            score: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            accuracy: 0,
            isAnswered: false
        }
    }

    //axios call
    componentDidMount() {
        axios.get(`${process.env.REACT_APP_API_URL}/questions`)
            .then(res => {
                this.setState({questions:res.data})
            })
            .catch(err => {
                console.log(err)
            })
    }

    //next button
    handleNext () {
        const {isAnswered, currentQuizIndex} = this.state
        if(isAnswered === true) {
            let plusCurrentQuiz = currentQuizIndex + 1
            this.setState({currentQuizIndex: plusCurrentQuiz})
            this.setState({isAnswered: false})
        }
    }

    //onChange
    onChangeOption (value) {
    
        this.setState({isAnswered:true})
        
        const { currentQuizIndex } = this.state
        let answers = [...this.state.answers]
        answers[currentQuizIndex] = value

        this.setState({answers}) 

        const { correct_answer, points } = this.state.questions[currentQuizIndex]

        if(value === correct_answer) {
            let plusScore = this.state.score + points
            let plusCorrectAnswers = this.state.correctAnswers + 1
            this.setState({score: plusScore, correctAnswers: plusCorrectAnswers})
        } 
        else if (value !== correct_answer) {
            let plusWrongAnswers  = this.state.wrongAnswers + 1
            this.setState({wrongAnswers: plusWrongAnswers})
        }
        else {
            let plusWrongAnswers  = this.state.wrongAnswers + 1
            this.setState({wrongAnswers: plusWrongAnswers})
        }

        //calculate accuracy
        let calAccuracy = ( this.state.correctAnswers / this.state.questions.length * 100 )
        this.setState({accuracy: calAccuracy})
    }

    render() {
        const { questions, currentQuizIndex, answers } = this.state

        if (currentQuizIndex >= questions.length) {
            return (
                <>
                    <Menu />
                        <div className="container-fluid">
                            <div className="row">
                                <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light shadow-sm text-dark sidebar collapse">
                                <div className="sidebar-sticky pt-3">
                                
                                <ul className="sidebar-menu flex-column text-dark">
                                    <li className="core text-primary">
                                        <span>core</span>
                                    </li>
                                    <li className="nav-item">
                                        <i className="las la-book la-lg"></i>
                                        <span className="ml-2">class 7 </span>
                                    </li>
                                    <li className="nav-item">
                                        <i className="las la-book la-lg"></i>
                                        <span className="ml-2">class 8 </span>
                                    </li>
                                    <li className="nav-item">
                                        <i className="las la-book la-lg"></i>
                                        <span className="ml-2">class 9 </span>
                                    </li>
                                    <li className="nav-item">
                                        <i className="las la-book la-lg"></i>
                                        <span className="ml-2">class 10 </span>
                                    </li>
                                </ul>

                                <ul className="sidebar-menu flex-column text-dark mt-4">
                                    <li className="core text-primary">
                                        <span>skill</span>
                                    </li>

                                    <li className="nav-item">
                                        <i className="las la-brain la-lg"></i>
                                        <span className="ml-2">Logical </span>
                                    </li>
                                    <li className="nav-item">
                                        <i className="las la-tachometer-alt la-lg"></i>
                                        <span className="ml-2">Accuracy </span>
                                    </li>
                                    <li className="nav-item">
                                        <i className="las la-stream la-lg"></i>
                                        <span className="ml-2">Categories </span>
                                    </li>

                                </ul>
                            
                                </div>
                                </nav>

                                <main role="main" className="main col-md-9 ml-sm-auto col-lg-10 px-md-4 no-gutters">
                                <div className="banner pt-5 pb-2 mb-3 text-white">
                                    <h1 className="h1 ml-5">Report</h1>   
                                    <div className="back-to text-white ml-5">
                                    <Link to='/user/dashboard' style={{color: '#fff'}}>
                                        <i className="las la-arrow-left la-lg"></i> Back to Dashboard
                                    </Link>
                                    </div>

                                    <div className="calendar float-right bg-white text-dark p-2 mr-5 rounded">
                                        <i className="las la-calendar la-lg p-1"></i>
                                            <span className="ml-3">Aug 30 Sunday</span>
                                        </div>
                                </div>

                                <div className="start-test bg-white shadow rounded text-dark ml-3 mr-3">
                                    <div className="row report-text d-flex justify-content-around">
                                        <div className="col-5 component p-5 shadow-sm text-center mt-3">
                                            Score <br />
                                            <span className="score">
                                                {this.state.score} / 50
                                            </span>
                                        </div>
                                        <div className="col-5 component p-5 shadow-sm text-center mt-3">
                                            Total Questions <br />
                                            <span className="score">
                                                {questions.length}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="row report-text d-flex justify-content-around mt-4">
                                        <div className="col-5 component p-5 shadow-sm text-center">
                                            Correct <br />
                                            <span className="score">
                                                {this.state.correctAnswers}
                                            </span>
                                        </div>
                                        <div className="col-5 component p-5 shadow-sm text-center">
                                            Incorrect <br />
                                            <span className="score">
                                                {this.state.wrongAnswers}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="row report-text d-flex justify-content-center mt-4">
                                        <div className="col-11 component p-5 shadow-sm text-center mb-3">
                                            Accuracy <br />
                                            <span className="score">
                                                {this.state.accuracy} %
                                            </span>
                                        </div>
                                    </div>
                                </div>


                                <div className="start-testy rounded text-dark ml-3 mr-3">
                                    <div className="row d-flex justify-content-around">
                                        <div className="col-12 p-5 ">
                                            <div className="text-white">
                                                Logical Practice
                                            </div>
                                            <hr />
                                            <div className="suggest text-dark pt-4 pb-4">
                                                Start with logical practice session and enhance your logical thinking
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="start-testyy rounded text-dark ml-3 mr-3 mb-5">
                                    <div className="row d-flex justify-content-around">
                                        <div className="col-12 p-5 ">
                                            <div className="text-white">
                                                Learn Mathematics
                                            </div>
                                            <hr />
                                            <div className="suggest text-dark pt-4 pb-4">
                                                Start with logical practice session and enhance your logical thinking
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </main>
                            </div>
                        </div>
                </>
            )
        }

        const { question, option_one, option_two, option_three, option_four, points} = questions[currentQuizIndex]

        return (
        
            <>
                <Menu />
                    <div className="quizArea card bg-white text-dark">
                        <div className="card-header text-center p-5"> Q{currentQuizIndex + 1} - {question} 
                            <span className="badge badge-danger ml-3">{points}m</span>
                        </div>
                        <div className="card-title"></div>
                            <div className="card-body">
                                <div className="first row m-3 d-flex justify-content-between">
                                        <label className="col-5 shadow-sm p-4 rounded">
                                            <input type='radio'
                                            checked={answers[currentQuizIndex] === option_one}
                                            value={option_one}
                                            style={{marginRight: '2rem'}}
                                            onChange={(evt) => this.onChangeOption(evt.target.value)}/>
                                            {option_one}
                                        </label>
                                        <label className="col-5 shadow-sm p-4 rounded">
                                            <input type='radio'
                                            checked={answers[currentQuizIndex] === option_two}
                                            value={option_two}
                                            style={{marginRight: '2rem'}}
                                            onChange={(evt) => this.onChangeOption(evt.target.value)}/>
                                            {option_two}
                                        </label>
                                </div>
                                <div className="second row m-3 d-flex justify-content-between">
                                        <label className="col-5 shadow-sm p-4 rounded">
                                            <input type='radio'
                                            checked={answers[currentQuizIndex] === option_three}
                                            value={option_three}
                                            style={{marginRight: '2rem'}}
                                            onChange={(evt) => this.onChangeOption(evt.target.value)}/>
                                            {option_three}
                                        </label>
                                        <label className="col-5 shadow-sm p-4 rounded">
                                            <input type='radio'
                                            checked={answers[currentQuizIndex] === option_four}
                                            value={option_four}
                                            style={{marginRight: '2rem'}}
                                            onChange={(evt) => this.onChangeOption(evt.target.value)}/>
                                            {option_four}
                                        </label>
                                </div>
                            </div>
                        <i className={this.state.isAnswered ? 'next las la-angle-right la-2x' : 'nexty las la-angle-right la-2x'} onClick={() => this.handleNext()}></i>
                    </div>

            </>
        )
    }
}

export default Quiz