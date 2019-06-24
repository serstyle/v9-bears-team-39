import React, { useState } from 'react';
import FormTextField from './FormTextField';

export default function MyNotesForm() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  return (
    <div>
      <h2>Add a note</h2>
      <FormTextField
        id="note-title"
        label="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <FormTextField
        id="note-body"
        multiline
        rows="8"
        label="Body"
        value={body}
        onChange={e => setBody(e.target.value)}
      />
    </div>
  );
}
