import React, { useState } from 'react';
import FormTextField from './FormTextField';

export default function MyNotesForm() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  return (
    <div>
      <FormTextField
        label="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
    </div>
  );
}
