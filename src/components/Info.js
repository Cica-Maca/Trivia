export default function Landing({ getNewTrivia, userAnswers, questions }) {
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
      {userAnswers.length > 0 && <button>Check your answers</button>}
    </div>
  );
}
