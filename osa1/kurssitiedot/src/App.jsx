const Header = (props) => {
  console.log(props)
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.part} {props.exercises}</p>
    </div>
  )
}
const Content = () => {
  return (
    <div>
      <Part part="Fundamentals of React" exercises={10} />
      <Part part="Using props to pass data" exercises={7} />
      <Part part="State of a component" exercises={14} />
    </div>
  )
}

const Total = (props) => {
  console.log(props)
  const total = props.parts.reduce((sum, part) => {
    return sum + part.exercises
  }, 0)
  return (
    <div>
      <p>
        Number of exercises {total}
      </p>
    </div>
  )
}

const App = () => {
  const course = {
  name: 'Half Stack application development',
  parts: [
    { name: 'Fundamentals of React', exercises: 10 },
    { name: 'Using props to pass data', exercises: 7 },
    { name: 'State of a component', exercises: 14 }
  ]
}

  return (
    <div>
      <Header course={course.name} />
      <Content course={course.name} exercises={course.exercises} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App
