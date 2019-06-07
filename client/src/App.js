import React, {useState} from 'react';
import './App.css';

function App() {
  const [note, setNote] = useState([])
  const [input, setInput] = useState('')
  return (
    <div className="App">
      <h1>Hello</h1>
     <form onSubmit={(e) =>{
        e.preventDefault()
        setNote([...note, input])}}>
       <input onChange={e => setInput(e.target.value)}/>
     </form>
     {note.map(n => {
       return(
         <p>{n}</p>
       )
     })}
    </div>
  );
}

export default App;
