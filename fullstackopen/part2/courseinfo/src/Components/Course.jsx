import React from 'react'

const Header = ({ title }) => {
    return (
        <h2>{title}</h2>
    )
}

const Content = ({ parts }) => {
    let total = 0;
    parts.forEach(part => {
        total += part.exercises
    })
    return (
        <div>
            {parts.map(part => {
                return (
                    <Part part={part}></Part>
                )
            })}
            <Total total={total} />
        </div>
    )
}

const Total = ({ total }) => {
    return (
        <h3>Total exercise {total}</h3>
    )
}

const Part = ({ part }) => {

    return (
        <div>{part.name} {part.exercises}</div>
    )
}
function Course({ courses }) {
    console.log(courses)
    return (
        <div>
            {courses.map((course) => {
                return (
                    <>
                        <Header title={course.name} />
                        <Content parts={course.parts} />
                    </>
                )
            })}
        </div>
    )
}

export default Course