import './App.css';
import Landing from './components/Landing';
import Question from './components/Question';
import Ending from './components/Ending';
import { useState, useEffect } from 'react';

function App() {
  const [trivia, setTrivia] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [userAnswers, setUserAnswers] = useState([]);
  const [gameState, setGameState] = useState(false);

  function getNewTrivia() {
    fetch('https://opentdb.com/api.php?amount=5&type=multiple')
      .then((response) => response.json())
      .then((data) => {
        // Error handling
        setTrivia(data.results);
        setCurrentQuestion(data.results[0]);
      });
  }

  function handleAnswer(answer) {
    answer === currentQuestion.correct_answer
      ? setUserAnswers((prevAnswers) => [...prevAnswers, { answer: true }])
      : setUserAnswers((prevAnswers) => [...prevAnswers, { answer: false }]);

    userAnswers.length < trivia.length - 1
      ? setCurrentQuestion(trivia[userAnswers.length + 1])
      : setGameState(true);
  }

  return (
    <div className='App'>
      {trivia.length === 0 || gameState === true ? (
        <Landing getNewTrivia={getNewTrivia} />
      ) : (
        <Question question={currentQuestion} handleAnswer={handleAnswer} />
      )}
    </div>
  );
}

export default App;
