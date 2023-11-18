import React, { useState } from 'react';
import QuestionCard from "./component/QuestionCard"
import './App.css';
import { fetchQuestion, Difficulty } from "./Api"
import { QuestionsState } from "./Api"
import { GlobalStyle, Wrapper } from './App.styles';

export type AnswerObject = {
  question: string,
  answer: string;
  correct: boolean;
  correctAnswer: string
}
const TOTAL_QUESTIONS = 10;


function App() {
  const [loading, setLoading] = useState(false)
  const [questions, setQuestion] = useState<QuestionsState[]>([])
  const [userAnswer, setUserAnswer] = useState<AnswerObject[]>([])
  const [number, setNumber] = useState(0)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)

  // console.log(fetchQuestion(TOTAL_QUESTIONS,Difficulty.EASY))
  console.log(questions)

  const startVia = async () => {
    setLoading(true)
    setGameOver(false)

    const newQuestion = await fetchQuestion(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    )
    setQuestion(newQuestion)
    setScore(0)
    setUserAnswer([])
    setNumber(0)
    setLoading(false)
  }
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      // userAnswer
      const answer = e.currentTarget.value
      // check answer against correct
      console.log("hiiii")
      console.log(answer)
      const correct = questions[number].correct_answer === answer
      if (correct) {
        setScore(prev => prev + 1)
      }
      const answerObject = {
        question: questions[number].question,
        answer: answer,
        correct,
        correctAnswer: questions[number].correct_answer
      }
      setUserAnswer(prev => [...prev, answerObject])
    }
  }
  const nextQuestion = (e: React.MouseEvent<HTMLButtonElement>) => {
    //  go to next question if not the last question
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true)
    } else {
      setNumber(nextQuestion)
    }
  }
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>REACT QUIZ</h1>
        {gameOver || userAnswer.length === TOTAL_QUESTIONS ? (

          <button className='start' onClick={startVia}>
            start
          </button>
        ) : null}
        {!gameOver ? <p className='score'>Score:{score}</p> : null}
        {loading && <p>Loading Question.....</p>}
        {!loading && !gameOver && (

          <QuestionCard
            totalQuestion={TOTAL_QUESTIONS}
            questionNr={number + 1}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswer ? userAnswer[number] : undefined}
            callback={checkAnswer}
          />
        )}
        {!gameOver && !loading && userAnswer.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
          <button className='next' onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}
        </Wrapper>

      </>
      )
}


      export default App;
