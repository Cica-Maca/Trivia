import { parseEntities } from './utils';

export default function QuestionScore({ question, userAnswers, index }) {
  const checkedAnswersElements = question.answers.map((answer) => {
    const markedCorrectAnswer =
      answer === question.correctAnswer ? 'correct-answer' : '';
    const markedUserAnswer =
      answer === userAnswers[index].answer && !userAnswers[index].correct
        ? 'incorrect-answer'
        : '';

    return (
      <button
        key={answer}
        className={`${markedCorrectAnswer} ${markedUserAnswer}`}
      >
        {parseEntities(answer)}
      </button>
    );
  });

  return (
    <div className='question-Rev'>
      <h1>{question.question}</h1>
      <div className='answers-Rev'>{checkedAnswersElements}</div>
    </div>
  );
}
