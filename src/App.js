import './App.css';
import Info from './components/Info';
import Question from './components/Question';
import { useState } from 'react';
import { shuffleArray } from './components/utils';
import { SwitchTransition, CSSTransition } from 'react-transition-group';

import { parseEntities } from './components/utils';

function App() {
  const [trivia, setTrivia] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [gameState, setGameState] = useState(false);

  function getNewTrivia() {
    fetch('https://opentdb.com/api.php?amount=10&type=multiple')
      .then((response) => response.json())
      .then((data) => {
        const newData = data.results.map((question) => {
          return {
            question: parseEntities(question.question),
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
      <SwitchTransition>
        {trivia.length === 0 || gameState === true ? (
          <CSSTransition classNames='slideLeft' key={trivia} timeout={500}>
            <Info
              getNewTrivia={getNewTrivia}
              userAnswers={userAnswers}
              questions={trivia}
            />
          </CSSTransition>
        ) : (
          <CSSTransition
            classNames='fadeDown'
            key={currentQuestion.question}
            timeout={500}
          >
            <Question question={currentQuestion} handleAnswer={handleAnswer} />
          </CSSTransition>
        )}
      </SwitchTransition>
    </div>
  );
}

export default App;
