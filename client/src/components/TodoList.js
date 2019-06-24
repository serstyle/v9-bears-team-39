/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useReducer, useContext } from 'react';

import { makeStyles } from '@material-ui/core/styles';
// style

import FormTextField from './FormTextField';

// components
import ListItems from './ListItems';
import Preloader from './Preloader';
// context
import { ThemeContext } from '../contexts/ThemeContext';

function todoReducer(state, action) {
  switch (action.type) {
    case 'GET_TODO_PENDING':
      return { ...state, isLoading: true };
    case 'GET_TODO_SUCCESS':
      return { ...state, todos: action.value, isLoading: false };
    case 'HANDLE_INPUT':
      return { ...state, todoInput: action.value };
    case 'HANDLE_SUBMIT_PENDING':
      return { ...state, handleSubmitLoading: true };
    case 'HANDLE_SUBMIT_SUCCESS':
      return {
        ...state,
        todos: [...state.todos, action.value],
        handleSubmitLoading: false,
        todoInput: '',
      };
    case 'HANDLE_DELETE_PENDING':
      return { ...state, handleDeletePending: true };
    case 'HANDLE_DELETE_SUCCESS':
      return {
        ...state,
        todos: state.todos.filter(t => t._id !== action.id),
        handleDeletePending: false,
      };
    case 'HANDLE_DELETE_FAILED':
      return { ...state, handleDeletePending: false };
    default:
      return state;
  }
}

const todoState = {
  todoInput: '',
  todos: [],
  isLoading: false,
  handleSubmitLoading: false,
  handleDeletePending: false,
};

export default function SimpleTabs(props) {
  const theme = useContext(ThemeContext);
  const useStyles = makeStyles(materialTheme => ({
    primary: { color: theme.primary },
  }));
  const classes = useStyles();
  // REDUCER FOR TODO
  const [state, dispatch] = useReducer(todoReducer, todoState);
  const { token, user } = props;
  const userid = user._id;
  // FETCH DATA
  useEffect(() => {
    dispatch({ type: 'GET_TODO_PENDING' });
    fetch(`/api/todos/${userid}`, {
      method: 'GET',
      headers: {
        'x-auth-token': token,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        dispatch({ type: 'GET_TODO_SUCCESS', value: data });
      });
  }, [token, userid]);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch({ type: 'HANDLE_SUBMIT_PENDING' });
    fetch(`/api/todos/`, {
      method: 'POST',
      headers: {
        'x-auth-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userid,
        title: state.todoInput,
      }),
    })
      .then(res => res.json())
      .then(data => dispatch({ type: 'HANDLE_SUBMIT_SUCCESS', value: data }))
      .catch(err => console.log(err));
  };
  const handleDelete = id => {
    dispatch({ type: 'HANDLE_DELETE_PENDING' });
    fetch(`/api/todos/${id}`, {
      method: 'DELETE',
      headers: {
        'x-auth-token': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userid,
      }),
    })
      .then(res => res.json())
      .then(data =>
        data.success
          ? dispatch({ type: 'HANDLE_DELETE_SUCCESS', id })
          : dispatch({ type: 'HANDLE_DELETE_FAILED' })
      )
      .catch(err => console.log(err));
  };
  return !state.isLoading ? (
    <>
      {state.handleSubmitLoading ? (
        <Preloader size={25} />
      ) : (
        <form onSubmit={handleSubmit}>
          <FormTextField
            // add theme primary for the focus or hover
            label="Add Todo"
            value={state.todoInput}
            onChange={e =>
              dispatch({ type: 'HANDLE_INPUT', value: e.target.value })
            }
          />
        </form>
      )}
      <ListItems
        pending={state.handleDeletePending}
        handleDelete={handleDelete}
        todo
        list={state.todos}
      />
    </>
  ) : (
    <p>Loading ...</p>
  );
}
