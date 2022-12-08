export default function Landing(props) {
  return (
    <div className='starting-page'>
      <h1>Welcome to trivia questions</h1>
      <button onClick={props.getNewTrivia}>Get trivia questions</button>
    </div>
  );
}
