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
            <button onClick={getNewTrivia}>Get trivia questions</button>
            {userAnswers.length > 0 && (
              <button
                className='show-button'
                onClick={() => setToggleAnswers((prevState) => !prevState)}
              >
                {toggleAnswers ? 'Hide Answers' : 'Show Answers'}
              </button>
            )}
            <select>
              <option value='any'>Any Category</option>
              <option value='9'>General Knowledge</option>
              <option value='10'>Books</option>
              <option value='11'>Film</option>
              <option value='12'>Music</option>
              <option value='13'>Musicals &amp; Theatres</option>
              <option value='14'>Television</option>
              <option value='15'>Video Games</option>
              <option value='16'>Board Games</option>
              <option value='29'>Comics</option>
              <option value='17'>Science &amp; Nature</option>
              <option value='18'>Computers</option>
              <option value='19'>Mathematics</option>
              <option value='20'>Mythology</option>
              <option value='21'>Sports</option>
              <option value='22'>Geography</option>
              <option value='23'>History</option>
              <option value='24'>Politics</option>
              <option value='25'>Art</option>
              <option value='26'>Celebrities</option>
              <option value='27'>Animals</option>
              <option value='28'>Vehicles</option>
              <option value='30'>Gadgets</option>
              <option value='31'>Japanese Anime &amp; Manga</option>
              <option value='32'>Cartoon &amp; Animations</option>
            </select>
          </div>
        </CSSTransition>
      )}
    </SwitchTransition>
  );
}
