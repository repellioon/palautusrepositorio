
const Course = ({course}) => {
  console.log(course)
  const total = course.parts.reduce((sum, part) => 
    sum + part.exercises, 0)
  return (
    <div>
      <Header name={course.name}/>   
      <Content parts={course.parts}/>
      <p>Total of {total} exercises</p>
    </div>
  )
}

const Part = ({part}) => {
  return ( <p> {part.name}  {part.exercises} </p> )}

const Content = ({parts}) =>{
  console.log (parts)
  return (
    <div>
      {parts.map(part => <Part key={part.id} part={part} /> )}
    </div>
  )
}

const Header = ({name}) => {
  return (
    <div>
      <h2>{name}</h2>
    </div>
  )
}

export default Course