
import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [state, setState] = useState({
      medicines: [{medicine: "Tylenol", level: 4 }],
      newMedicine: {  
        medicine: "",
        level: "3"
    },
    editMode: false
  });

  useEffect(function() {
    async function getAppData () {

      const medicines = await fetch('http://localhost:3001/api/medicines')
      .then(res => res.json());

      setState(prevState =>({
        ...prevState,
        medicines
      
      }));
    }

   getAppData();

  }, []);

  async function handleSumbit(e) {
    e.preventDefault();

    if(state.editMode) {
      try {
        const { medicine, level, _id } = state.newMedicine;

        const medicines = await fetch(`http://localhost:3001/api/medicines/${_id}`, {
          method: 'PUT',
          headers: {
            'Content-type': 'Application/json'

          },
         body: JSON.stringify({ medicine, level })

        }).then(res => res.json());

      setState(prevState => ({
       ...prevState,
       medicines,
      editMode: false,
         newMedicine: {  // this resets forms after its edited by user
            medicine: '',
            level: '',
            }
        }));

      } catch (error) {

      }

    } else {
     //this creates a new medicine
      try {
        const medicine = await fetch('http://localhost:3001/api/medicines', {
         method: 'POST',
         headers: {
         'Content-type': 'Application/json'
       },
       body: JSON.stringify(state.newMedicine) //this is what we turn into JSON,then transmit to backend
  
     }).then(res => res.json());
  
     //.then(data => // new med that got created 
       setState({
        medicines: [...state.medicines, medicine],
        newMedicine: {
           medicine: "", 
            level: "3"
       }
      });
    } catch(error) {
      console.log(error);          
     }
   }
}
    

  function handleChange(e) {
    setState(prevState => ({
         ...prevState,
          newMedicine: {
            ...prevState.newMedicine,
           [e.target.name]: e.target.value

       }
    })); 
  }

  function handleEdit(id) {
    const medicinetoEdit = state.medicines.find(medicine => medicine._id === id); //locate obj and assign to var
    setState(prevState => ({
      ...prevState,
      newMedicine: medicinetoEdit,
      editMode: true

    }));
   

  }

  return (
    <section>
      <h2>Kids Medicine Tracker</h2>
      <hr />
      {state.medicines.map((s, i) => (
        <article key={i}>
          <div>{s.medicine}</div> 
          <div>{s.level}</div>
          <div 
          className="controls"
          onClick={() => handleEdit(s._id)}>{'✏️'}</div>
          
        </article>
      ))}
      <hr />
      <form onSubmit={handleSumbit}>
        <label>
          <span>Name</span>
        </label>
          <input name="medicine" value={state.newMedicine.medicine} onChange={handleChange}/>
        <label>
          <span>Quantity:</span>
          <select name="level" value={state.newMedicine.level} onChange={handleChange}>
            <option value="1">1ml</option>
            <option value="2">2ml</option>
            <option value="3">3ml</option>
            <option value="4">4ml</option>
            <option value="5">5ml</option>
          </select>
        </label>
        <button>{state.editMode ? 'EDIT Medicine' : 'ADD MEDICINE'}</button>
      </form>
    </section>
  );
}