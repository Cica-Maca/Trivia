import './App.css';
import Info from './components/Info';
import Question from './components/Question';
import { useState } from 'react';
import { shuffleArray } from './components/utils';
import { SwitchTransition, CSSTransition } from 'react-transition-group';

function App() {
  const [trivia, setTrivia] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [gameState, setGameState] = useState(false);

  function getNewTrivia() {
    fetch('https://opentdb.com/api.php?amount=5&type=multiple')
      .then((response) => response.json())
      .then((data) => {
        const newData = data.results.map((question) => {
          return {
            question: question.question,
            answers: shuffleArray([
              ...question.incorrect_answers,
              question.correct_answer,
            ]),
            correctAnswer: question.correct_answer,
          };
        });

        setUserAnswers([]);
        setTrivia(newData);
        setCurrentQuestion(newData[0]);
        setGameState(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleAnswer(answer) {
    setUserAnswers((prevAnswers) => [
      ...prevAnswers,
      {
        answer: answer,
        correctAnswer: currentQuestion.correctAnswer,
        correct: answer === currentQuestion.correctAnswer,
      },
    ]);

    userAnswers.length < trivia.length - 1
      ? setCurrentQuestion(trivia[userAnswers.length + 1])
      : setGameState(true);
  }

  return (
    <div className='App'>
      <SwitchTransition mode={'out-in'}>
        {trivia.length === 0 || gameState === true ? (
          <CSSTransition classNames='fade' key={trivia} timeout={300}>
            <Info
              getNewTrivia={getNewTrivia}
              userAnswers={userAnswers}
              questions={trivia}
            />
          </CSSTransition>
        ) : (
          <CSSTransition
            classNames='fade'
            key={currentQuestion.question}
            timeout={300}
          >
            <Question question={currentQuestion} handleAnswer={handleAnswer} />
          </CSSTransition>
        )}
      </SwitchTransition>
    </div>
  );
}

export default App;
