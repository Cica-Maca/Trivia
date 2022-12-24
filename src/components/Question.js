import { parseEntities } from './utils';

export default function Question({ question, handleAnswer }) {
  const formatedQuestion = parseEntities(question.question);

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
      <h1>{formatedQuestion}</h1>
      <div className='question-answers'>{answersElements}</div>
    </div>
  );
}
