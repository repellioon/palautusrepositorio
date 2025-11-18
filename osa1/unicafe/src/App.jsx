import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}
const StatisticLine = (props) => {
  return(
    <tbody>
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
    </tbody>
  )
}
const Statistics = ({good, bad, neutral}) => {
  const all = good + bad + neutral
  const average = all === 0 ? 0 : (good - bad) / all
  const positive = all === 0 ? 0 : (good / all) * 100

  if (all > 0) {
  return ( 
    <table>
        <StatisticLine text="good" value= {good}/>
        <StatisticLine text="neutral" value= {neutral}/>
        <StatisticLine text="bad" value= {bad}/>
        <StatisticLine text="all" value= {all}/>
        <StatisticLine text="positive" value= {positive + " %"}/>
        <StatisticLine text="average" value= {average}/>
    </table>
  )
}
return <div>No feedback given</div>
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1> 
      <Button text="good" onClick={() => setGood(good + 1)}/>
      <Button text="neutral" onClick={() => setNeutral(neutral + 1)}/>
      <Button text="bad" onClick={() => setBad(bad + 1)}/> 

      <h1>statistics</h1> 
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App

/*    <Display text="good" value= {good}/>
      <Display text="neutral" value= {neutral}/>
      <Display text="bad" value= {bad}/>
      <Display text="all" value= {all} />
      <Display text="average" value={average} />
      <Display text="positive" value={positive + " %"} /> 
      
        const handleGoodClick = () => {setGood(good + 1)}
  const handleNeutralClick = () => {setNeutral(neutral + 1)}
  const handleBadClick = () => {setBad(bad + 1)}*/