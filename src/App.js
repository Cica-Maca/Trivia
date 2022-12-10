import './App.css';
import Landing from './components/Landing';
import Question from './components/Question';
import { useState } from 'react';

function App() {
  const [trivia, setTrivia] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({});

  function getNewTrivia() {
    fetch('https://opentdb.com/api.php?amount=5&type=multiple')
      .then((response) => response.json())
      .then((data) => {
        // Error handling
        setTrivia(data.results);
        setCurrentQuestion(data.results[0]);
      });
  }

  return (
    <div className='App'>
      {trivia.length === 0 ? (
        <Landing getNewTrivia={getNewTrivia} />
      ) : (
        <Question question={currentQuestion} />
      )}
    </div>
  );
}

export default App;
