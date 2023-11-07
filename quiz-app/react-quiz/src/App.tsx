import React,{useState} from 'react';
import QuestionCard from "./component/QuestionCard"
import './App.css';
import {fetchQuestion,Difficulty} from "./Api"



const TOTAL_QUESTIONS=10;


function App() {
const [loading,setLoading]=useState(false)
const [questions,setQuestion]=useState([])
const [userAnswer,setUserAnswer]=useState([])
const [number,setNumber]=useState(0)
const [score,setScore]=useState(0)
const [gameOver,setGameOver]=useState(true)

console.log(fetchQuestion(TOTAL_QUESTIONS,Difficulty.EASY))

  const startVia = async () => {

  }
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {

  }
  const nextQuestion = (e: React.MouseEvent<HTMLButtonElement>) => {

  }
  return (
    <div className="App">
      <h1>REACT QUIZ</h1>
      <button className="start" onClick={startVia}>
        start
      </button>
      <p className='score'>Score</p>
      <p>Loading Question.....</p>
      {/* <QuestionCard
       questionNr={number+1} 
       totalQuestion={TOTAL_QUESTIONS}
       question={questions[number].question}
       answers={questions[number].answers}
       userAnswer={userAnswer?userAnswer[number]:undefined}
       callback={checkAnswer}
       /> */}
      <button className="next" onClick={nextQuestion}>
        Next Question
      </button>
    </div>
  )
}



export default App;
