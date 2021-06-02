import { useState } from "react";
import "./App.css";

export default function App() {
  const [state, setState] = useState({
    medicines: [{ medicine: "Tylenol", level: 4 }]
  });

  function addMedicine() {
    alert("ADD SKILL CLICKED");
  }

  return (
    <section>
      <h2>WelliKids Medicine Tracker</h2>
      <hr />
      {state.medicines.map((s, i) => (
        <article key={i}>
          <div>{s.medicine}</div> <div>{s.level}</div>
        </article>
      ))}
      <hr />
      <form>
        <label>
          <span>Name</span>
          <input name="medicine" />
        </label>
        <label>
          <span>Quantity:</span>
          <select name="level">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
        <button>Add Medicine</button>
      </form>
    </section>
  );
}