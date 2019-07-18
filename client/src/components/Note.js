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
  const useStyles = makeStyles(materialTheme => ({
    button: {
      background: theme.secondary,
      color: 'white',
    },
  }));
  const classes = useStyles();
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'GET_NOTES_PENDING' });
      const data = await fetch(`/api/notes/${user._id}`, {
        method: 'GET',
        headers: {
          'x-auth-token': token,
          'Content-Type': 'application/json',
        },
      });
      const fetchNotes = await data.json();
      dispatch({ type: 'GET_NOTES_SUCCESS', value: fetchNotes });
    };
    fetchData();
  }, [token, user._id]);

  // const addNote = async e => {
  //   e.preventDefault();
  //   console.log('trigger');
  //   const data = await fetch('api/notes', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ title, body }),
  //   });
  //   const fetchNewNotes = data.json();
  //   setNote(fetchNewNotes);
  // };

  // const delNote = async id => {
  //   const data = await fetch(`api/notes/${id}`, {
  //     method: 'DELETE',
  //     headers: { 'Content-Type': 'application/json' },
  //   });
  //   const isSuccess = data.json();
  //   return !isSuccess ? null : setNote({});
  // };

  return (
    <>
      <Modal button={classes.button} name="Add Note">
        <MyNotesForm />
      </Modal>
      <ListItems list={state.notes} />
    </>
  );
}

export default Note;
