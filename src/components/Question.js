import { parseEntities } from './utils';

export default function Question({ question, handleAnswer }) {
  const answersElements = question.answers.map((answer) => (
    <button
      key={answer}
      onClick={() => {
        handleAnswer(answer);
      }}
    >
      {parseEntities(answer)}
    </button>
  ));

  return (
    <div className='question-content' key={question.question}>
      <h1>{question.question}</h1>
      <div className='question-answers'>{answersElements}</div>
    </div>
  );
}
