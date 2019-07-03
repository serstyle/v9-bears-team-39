import React, { useState } from 'react';
import FormTextField from './FormTextField';

export default function MyNotesForm({ addNote }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  return (
    <div>
      <h2>Add a note</h2>
      <form onSubmit={e => addNote(e, title, body)}>
        <FormTextField
          id="note-title"
          label="Title"
          value={title}
          required
          onChange={e => setTitle(e.target.value)}
        />
        <FormTextField
          id="note-body"
          multiline
          required
          rows="8"
          label="Body"
          value={body}
          onChange={e => setBody(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
