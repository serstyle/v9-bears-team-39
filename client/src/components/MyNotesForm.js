import React, { useState } from 'react';
import FormTextField from './FormTextField';
import FormButton from './FormButton';

export default function MyNotesForm({ addNote }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const submitAddNote = e => {
    addNote(e, title, body);
  };
  return (
    <div>
      <h2>Add a note</h2>
      <form onSubmit={submitAddNote}>
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
        <FormButton name="Save" onSubmit={submitAddNote}>
          Submit
        </FormButton>
      </form>
    </div>
  );
}
