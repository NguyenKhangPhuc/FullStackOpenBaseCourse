import { useState } from 'react'

const StatisticLine = ({ text, value, unit }) => {
  return (
    <tbody>
      <tr>
        <td>{text}</td>
        <td>{value}{unit}</td>
      </tr>
    </tbody>
  )
}

const Statistic = (props) => {
  console.log(props)
  let { good, neutral, bad } = props
  let all = good + neutral + bad
  let average = (good * 1 + bad * -1) / all
  let positive = (good / all) * 100
  if (all == 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <>
      <h1>statistics</h1>
      <table>
        <StatisticLine text="Good" value={good} unit={""} />
        <StatisticLine text="Neutral" value={neutral} unit={""} />
        <StatisticLine text="Bad" value={bad} unit={""} />
        <StatisticLine text="All" value={all} unit={""} />
        <StatisticLine text="Average" value={average} unit={""} />
        <StatisticLine text="Positive" value={positive} unit={"%"} />
      </table>
    </>

  )
}

const FeedBackButton = ({ text, onClick }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const handleGood = () => {
    setGood(good + 1)
  }
  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }
  const handleBad = () => {
    setBad(bad + 1)
  }
  return (
    <div>
      <h1>give feedback</h1>
      <FeedBackButton text="Good" onClick={handleGood} />
      <FeedBackButton text="Neutral" onClick={handleNeutral} />
      <FeedBackButton text="Bad" onClick={handleBad} />
      <Statistic good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App