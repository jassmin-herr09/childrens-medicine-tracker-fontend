
import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [state, setState] = useState({
    skills: [{ skill: "Tylenol", level: 4 }],
    newSkill: {
     skill: "",
     level: "3"
    }
  });

  useEffect(function() {
    function getAppData () {
    fetch('http://localhost:3001/api/skills')
    .then(response => response.json())
    .then(data => setState(prevState =>({
      ...prevState,
      skills: data
      
    })));
    }

   getAppData()

  }, []);

  function addSkill(e) {
    e.preventDefault();
   // alert("ADD SKILL CLICKED");
   setState({
     skills: [...state.skills, state.newSkill],
     newSkill: {
       skill: "",
       level: "3"
     }
   });

 }

  function handleChange(e) {
    setState(prevState => ({
        skills: prevState.skills,
        //...prevState, //function, method overloading
        newSkill: {
          ...prevState.newSkill,
           [e.target.name]: e.target.value

       }
    })); 
  }

  return (
    <section>
      <h2>Kids Medicine Tracker</h2>
      <hr />
      {state.skills.map((s, i) => (
        <article key={i}>
          <div>{s.skill}</div> <div>{s.level}</div>
        </article>
      ))}
      <hr />
      <form onSubmit={addSkill}>
        <label>
          <span>Name</span>
        </label>
          <input name="skill" value={state.newSkill.skill} onChange={handleChange}/>
        <label>
          <span>Quantity:</span>
          <select name="level" value={state.newSkill.level} onChange={handleChange}>
            <option value="1ml">1ml</option>
            <option value="2ml">2ml</option>
            <option value="3ml">3ml</option>
            <option value="4ml">4ml</option>
            <option value="5ml">5ml</option>
          </select>
        </label>
        <button>Add Medicine</button>
      </form>
    </section>
  );
}