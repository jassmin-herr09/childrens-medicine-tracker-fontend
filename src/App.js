
import { useState, useEffect } from "react";
import { auth } from './services/firebase';
import "./App.css";
import Header from './components/Header/Header';



//import 'react-datepicker/dist/react-datepicker.css'
//import MyComponent from "./MyComponent";

//import moment from 'moment'



export default function App() {
  const [state, setState] = useState({
      medicines: [{medicine: "Tylenol", level: 4 }],
      newMedicine: {  
        medicine: "",
        level: "1ml",
        date: ''
    },
 

    editMode: false
  });

  const [ userState, setUserState ] = useState({
   user: null
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

   const unsubscribe = auth.onAuthStateChanged(user => setUserState({ user })); 


  return function() {
    unsubscribe();
    }
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

      setState({
       medicines,
      editMode: false,
         newMedicine: {  // this resets forms after its edited by user
            medicine: '',
            level: '1ml',
            date: ''
            }
        });

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
            level: "1ml",
            date: ''
       }
      });
    } catch(error) {
           
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

  async function handleDelete(id) {
    try {
     const medicines = await fetch(`http://localhost:3001/api/medicines/${id}`, {
       method: 'DELETE' //send delete request using ajax, no headers or reqbod
     }).then(res => res.json());
     setState(prevState => ({
       ...prevState,
       medicines

     }));
    } catch (error){

    }
  }



  return (
    <>
    <Header user={userState.user} />
    <section>
      
      {state.medicines.map((s, i) => (
        <article key={i}>
          <div>{s.medicine}</div> 
          <div>{s.level}</div>
          <div>{s.date}</div>
          <div 
          className="controls"
          onClick={() => handleEdit(s._id)}>Edit</div>

        <div 
         className="controls"
         onClick={() => handleDelete(s._id)}>Delete</div>
          
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
            <option value="1ml">1ml</option>
            <option value="2ml">2ml</option>
            <option value="3ml">3ml</option>
            <option value="4ml">4ml</option>
            <option value="5ml">5ml</option>
          </select>
        </label>
        <label for="medicine-time">
     <span>Date</span>
     </label>
      <input name="date" type="datetime-local" value={state.newMedicine.date} onChange={handleChange}/>
        
        
        <button>{state.editMode ? 'Edit Medicine' : 'Add Medicine'}</button>
      </form>
    </section>
    </>
  );
}