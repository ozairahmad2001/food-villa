import React, { useEffect } from 'react'

const About = () => {
  console.log("inside the about component")

  useEffect (()=>{
    console.log("inside the use effect hook")
  });
  return (
    <div>
        <h1>About Us Page</h1>
        <p>{" "}This is the seventh chapter of namaste react course, Finding the path.</p>
    </div>
  )
}

export default About