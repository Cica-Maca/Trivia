import { useState } from 'react';
import QuestionScore from './QuestionScore';

import { SwitchTransition, CSSTransition } from 'react-transition-group';

export default function Info({ getNewTrivia, userAnswers, questions }) {
  const [toggleAnswers, setToggleAnswers] = useState(false);

  const revisedQuestionsElements = questions.map((question, index) => {
    return (
      <QuestionScore
        key={question.question}
        question={question}
        userAnswers={userAnswers}
        index={index}
      />
    );
  });

  const correctAnswersNum = userAnswers.filter(
    (answer) => answer.correct === true
  ).length;

  const StartOrEndElement =
    userAnswers.length === 0 ? (
      <h1>Welcome to trivia.</h1>
    ) : (
      <h1>
        You scored {correctAnswersNum}/{userAnswers.length} correct answers!
      </h1>
    );

  return (
    <div className='starting-page'>
      {StartOrEndElement}
      <button onClick={getNewTrivia}>Get trivia questions</button>
      {toggleAnswers && revisedQuestionsElements}
      {userAnswers.length > 0 && (
        <button onClick={() => setToggleAnswers((prevState) => !prevState)}>
          {toggleAnswers ? 'Hide Answers' : 'Show Answers'}
        </button>
      )}
    </div>
  );
}
