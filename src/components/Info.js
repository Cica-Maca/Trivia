export default function Landing({ getNewTrivia, userAnswers, questions }) {
  const correctAnswers = userAnswers.filter(
    (answer) => answer.correct === true
  ).length;
  console.log(correctAnswers, userAnswers);
  return (
    <div className='starting-page'>
      {userAnswers.length === 0 ? (
        <h1>Welcome to trivia.</h1>
      ) : (
        <h1>
          You chose {correctAnswers}/{userAnswers.length} correct answers!
        </h1>
      )}
      <button onClick={getNewTrivia}>Get trivia questions</button>
      {userAnswers.length > 0 && <button>Check your answers</button>}
    </div>
  );
}
