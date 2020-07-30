import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ value, text }) => {
  const [count, setCount] = value;
  return (
    <button onClick={() => setCount(count + 1)}>{text}</button>
  )
}

const Statistics = ({ text, value }) => 
(
    <table>
      <tbody>
        <tr>
          <td>{text}</td>
          <td>{value}</td>
        </tr>
      </tbody>
    </table>
  )

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give feedback</h1>
      <>
        <Button text='Good'
          value={[good, setGood]} />
        <Button text='Neutral'
          value={[neutral, setNeutral]} />
        <Button text='Bad'
          value={[bad, setBad]} />
      </>

      <h2>Statistics</h2>
      {good||bad||neutral?
      (<>
      <Statistics value={good}
        text='Good' />
      <Statistics value={neutral}
        text='Neutral' />
      <Statistics value={bad}
        text='Bad' />
      <Statistics value={good + bad + neutral}
        text='All' />
      <Statistics value={(good - bad) / (good + bad + neutral)}
        text='Average' />
      <Statistics value={(good / (good + bad + neutral)) * 100 + '%'} text='Positive' />
        </>):
        <p>No feedback given</p>}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));