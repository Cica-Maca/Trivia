import { useState } from 'react';
import { parseEntities } from './utils';

export default function Info({ getNewTrivia, userAnswers, questions }) {
  const [toggleAnswers, setToggleAnswers] = useState(false);

  const revisedQuestionsElements = questions.map((question, index) => {
    return (
      <div className='question-Rev'>
        <h1>{question.question}</h1>
        <div className='answers-Rev'>
          {question.answers.map((answer) => (
            <button>{parseEntities(answer)}</button>
          ))}
        </div>
      </div>
    );
  });

  console.log(userAnswers);
  const correctAnswersNum = userAnswers.filter(
    (answer) => answer.correct === true
  ).length;

  return (
    <div className='starting-page'>
      {userAnswers.length === 0 ? (
        <h1>Welcome to trivia.</h1>
      ) : (
        <h1>
          You scored {correctAnswersNum}/{userAnswers.length} correct answers!
        </h1>
      )}
      <button onClick={getNewTrivia}>Get trivia questions</button>
      {toggleAnswers && revisedQuestionsElements}
      {userAnswers.length > 0 && (
        <button onClick={() => setToggleAnswers((prevState) => !prevState)}>
          Check your answers
        </button>
      )}
    </div>
  );
}
