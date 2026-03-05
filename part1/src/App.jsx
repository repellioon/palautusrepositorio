const Hello = ({name, age}) => { //destrukturoitu funktio Hello
  //pyydetään arviota henkilön syntymävuodesta omassa funktiossaan
  const bornYear = () =>  new Date().getFullYear()  - age

    return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born {bornYear()}</p>
    </div>
  )
}

const Display = props => <div>{props.value}</div>

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}
const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)
//const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

//juurikomponentti on nimeltään App
import { useState } from 'react' //useState -funktio
const App = () => {
  const [value, setValue] = useState(10)
    const setToValue = (newValue) => {
    console.log('value now', newValue)
    setValue(newValue)
  }
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    const updatedLeft = left + 1
    setLeft(updatedLeft)
    setTotal(updatedLeft + right) 
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    const updatedRight= right + 1
    setRight(updatedRight)
    setTotal(updatedRight + left)
  }

  return (
    <div>
      <Display value={value} />
      <Button onClick={handleLeftClick}>left</Button>
      <Button onClick={() => setToValue(1000)} text="thousand" />
      <Button onClick={() => setToValue(0)} text="reset" />
      <Button onClick={() => setToValue(value + 1)} text="increment" />
      <History allClicks={allClicks} />
      <p>{allClicks.join(' ')}</p>
    </div>
  )
}

/*const App = () => {
  const [ counter, setCounter ] = useState(0) //funktiokutsu
  /* Kutsu saa aikaan sen että komponentille luodaan tila, 
  joka saa alkuarvokseen nollan. Funktio palauttaa taulukon,
  jossa on kaksi alkiota. Alkiot otetaan talteen muuttujiin 
  counter ja setCounter.
  counter pitää sisällään tilan arvon, joka on aluksi nolla.
  setcounter on viite funktioon, jonka avulla tilaa voidaan muuttaa.

 console.log('rendering with counter value', counter)

  const increaseByOne = () => {
    console.log('increasing, value before', counter)
    setCounter(counter + 1)
  }

  const decreaseByOne = () => {
    console.log('decreasing, value before', counter)
    setCounter(counter - 1)
  }  
  const setToZero = () => {
    console.log('resetting to zero, value before', counter)
    setCounter(0)
  }

  /*setTimeout( //funktion seTimeout avulla määritellään kuinka paljon tilan counter arvoa lasketaan tai nostetaan
    () => setCounter(counter + 1),
    1000
  )
// console.log('rendering...', counter)
  return (
    <div>
      <Display counter={counter}/>      
      <Button onClick={increaseByOne} text='plus'/>
      <Button onClick={setToZero} text='zero'/>     
      <Button onClick={decreaseByOne} text='minus'/> 
    </div>
  )
}*/

export default App