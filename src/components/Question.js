import { shuffleArray, parseEntities } from './utils';

export default function Question({ question, handleAnswer }) {
  const formatedQuestion = parseEntities(question.question);

  const answers = [...question.incorrect_answers, question.correct_answer];
  shuffleArray(answers);

  const answersElements = answers.map((choice) => (
    <button
      key={choice}
      onClick={() => {
        handleAnswer(choice);
      }}
    >
      {choice}
    </button>
  ));

  return (
    <div className='question-content'>
      <h1>{formatedQuestion}</h1>
      <div className='question-answers'>{answersElements}</div>
    </div>
  );
}
