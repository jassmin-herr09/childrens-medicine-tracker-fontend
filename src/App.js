
import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [state, setState] = useState({
      medicines: [{medicine: "Tylenol", level: '4ml'}],
      newMedicine: {  
        medicine: "",
        level: "3"
    }
  });

  useEffect(function() {
    function getAppData () {
    fetch('http://localhost:3001/api/medicines')
    .then(response => response.json())
    .then(data => setState(prevState =>({
      ...prevState,
      medicines: data
      
    })));
    }

   getAppData()

  }, []);
    function addMedicine(e) {
    e.preventDefault();
   setState({
       medicines: [...state.medicines, state.newMedicine],
       newMedicine: {
         medicine: "", 
          level: "3"
     }
   });

 }

  function handleChange(e) {
    setState(prevState => ({
         medicines: prevState.medicines,
          newMedicine: {
            ...prevState.newMedicine,
           [e.target.name]: e.target.value

       }
    })); 
  }

  return (
    <section>
      <h2>Kids Medicine Tracker</h2>
      <hr />
      {state.medicines.map((s, i) => (
        <article key={i}>
          <div>{s.medicine}</div> <div>{s.level}</div>
          
        </article>
      ))}
      <hr />
      <form onSubmit={addMedicine}>
        <label>
          <span>Name</span>
        </label>
          <input name="medicine" value={state.newMedicine.medicine} onChange={handleChange}/>
        <label>
          <span>Quantity:</span>
          <select name="level" value={state.newMedicine.level} onChange={handleChange}>
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