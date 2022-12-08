import './App.css';
import Landing from './components/Landing';
import Question from './components/Question';
import { useState } from 'react';

function App() {
  const [trivia, setTrivia] = useState([]);

  function getNewTrivia() {
    fetch('https://opentdb.com/api.php?amount=5')
      .then((response) => response.json())
      .then((data) => {
        // Error handling
        setTrivia(data.results);
        console.log(data);
      });
  }

  return (
    <div className='App'>
      {trivia.length === 0 ? (
        <Landing getNewTrivia={getNewTrivia} />
      ) : (
        <Question />
      )}
    </div>
  );
}

export default App;
