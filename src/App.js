import './App.css';
import Landing from './components/Landing';
import { useState, useEffect } from 'react';

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
      {trivia.length <= 0 ? (
        <Landing getNewTrivia={getNewTrivia} />
      ) : (
        <h1>Trivia</h1>
      )}
    </div>
  );
}

export default App;
