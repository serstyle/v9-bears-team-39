// THIS IS TEMPORARY

import React, { useState, useEffect } from 'react';

function Note() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [note, setNote] = useState({});

  // componentDidmount / didUpdate
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('/api/notes');
      const fetchNotes = await data.json();
      setNotes(fetchNotes);
    };
    fetchData();
  }, [note]);

  // I don't know if it s good practice to do that
  const addNote = async e => {
    e.preventDefault();
    console.log('trigger');
    const data = await fetch('api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body }),
    });
    const fetchNewNotes = data.json();
    setNote(fetchNewNotes);
  };

  const delNote = async id => {
    const data = await fetch(`api/notes/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    const isSuccess = data.json();
    return !isSuccess ? null : setNote({});
  };

  return (
    <div className="App">
      <h1>Hello</h1>
      <form onSubmit={addNote}>
        <input placeholder="title" onChange={e => setTitle(e.target.value)} />
        <input placeholder="body" onChange={e => setBody(e.target.value)} />
        <input type="submit" />
      </form>
      {notes.map(e => {
        const id = e._id;
        return (
          <div key={id}>
            <h2>{e.title}</h2>
            <p>{e.body}</p>
            <button type="button" onClick={() => delNote(id)}>
              X
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Note;
