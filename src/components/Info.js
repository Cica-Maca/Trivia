import { useState } from 'react';
import QuestionScore from './QuestionScore';

import { SwitchTransition, CSSTransition } from 'react-transition-group';

import Categories from './Categories';

export default function Info({
  getNewTrivia,
  userAnswers,
  questions,
  category,
  setCategory,
}) {
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
      <h1>Trivia</h1>
    ) : (
      <h1>
        You scored {correctAnswersNum}/{userAnswers.length} correct answers!
      </h1>
    );

  return (
    <SwitchTransition>
      {toggleAnswers ? (
        <CSSTransition classNames='slideRight' key={1} timeout={500}>
          <div className='info-page adjust-height'>
            <ul className='info-page-answers'>{revisedQuestionsElements}</ul>
            <button
              className='show-button'
              onClick={() => setToggleAnswers((prevState) => !prevState)}
            >
              {toggleAnswers ? 'Hide Answers' : 'Show Answers'}
            </button>
          </div>
        </CSSTransition>
      ) : (
        <CSSTransition classNames='slideLeft' key={2} timeout={500}>
          <div className='info-page'>
            {StartOrEndElement}
            <button onClick={getNewTrivia}>Play</button>
            <Categories category={category} setCategory={setCategory} />

            {userAnswers.length > 0 && (
              <button
                className='show-button'
                onClick={() => setToggleAnswers((prevState) => !prevState)}
              >
                {toggleAnswers ? 'Hide Answers' : 'Show Answers'}
              </button>
            )}
          </div>
        </CSSTransition>
      )}
    </SwitchTransition>
  );
}
