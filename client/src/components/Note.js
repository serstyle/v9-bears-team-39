// THIS IS TEMPORARY

import React, { useEffect, useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItems from './ListItems';

import Modal from './Modal';
import MyNotesForm from './MyNotesForm';

const NoteReducer = (state, action) => {
  switch (action.type) {
    case 'GET_NOTES_PENDING':
      return { ...state, isLoading: true };
    case 'GET_NOTES_SUCCESS':
      return { ...state, isLoading: false, notes: action.value };
    case 'ADD_NOTE_SUCCESS':
      return { ...state, notes: [action.value, ...state.notes] };
    case 'DEL_NOTE_SUCCESS':
      return { ...state, notes: action.value };
    default:
      return state;
  }
};

const noteState = {
  notes: [],
  isLoading: false,
};

function Note(props) {
  const { token, user, theme } = props;
  const [state, dispatch] = useReducer(NoteReducer, noteState);
  const useStyles = makeStyles(() => ({
    button: {
      background: theme.secondary,
      color: 'white',
    },
  }));
  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'GET_NOTES_PENDING' });
      const data = await fetch(
        `${process.env.REACT_APP_PROVIDER}api/notes/${user._id}`,
        {
          method: 'GET',
          headers: {
            'x-auth-token': token,
            'Content-Type': 'application/json',
          },
        }
      );
      const fetchNotes = await data.json();
      dispatch({ type: 'GET_NOTES_SUCCESS', value: fetchNotes });
    };
    fetchData();
  }, [token, user._id]);

  const addNote = async (e, title, body) => {
    e.preventDefault();
    const userid = user._id;
    console.log('trigger');
    try {
      const data = await fetch(`${process.env.REACT_APP_PROVIDER}api/notes`, {
        method: 'POST',
        headers: {
          'x-auth-token': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, body, userid }),
      });
      const fetchNewNotes = await data.json();
      console.log(fetchNewNotes);
      dispatch({ type: 'ADD_NOTE_SUCCESS', value: fetchNewNotes });
    } catch (err) {
      console.log(err);
    }
  };

  const delNote = async id => {
    console.log(id);
    const data = await fetch(
      `${process.env.REACT_APP_PROVIDER}api/notes/${id}`,
      {
        method: 'DELETE',
        headers: { 'x-auth-token': token, 'Content-Type': 'application/json' },
        body: JSON.stringify({ userid: user._id }),
      }
    );
    const isSuccess = data.json();
    if (isSuccess) {
      const newNotes = state.notes.filter(e => e._id !== id);
      dispatch({ type: 'DEL_NOTE_SUCCESS', value: newNotes });
    }
  };

  return (
    <>
      <Modal items={state.notes} button={classes.button} name="Add Note">
        <MyNotesForm addNote={addNote} />
      </Modal>
      <ListItems list={state.notes} handleDelete={delNote} />
    </>
  );
}

export default Note;
