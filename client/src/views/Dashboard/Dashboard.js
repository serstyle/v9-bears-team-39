/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/core/styles';

// components
import Sidebar from '../../components/Sidebar';
import SimpleTabs from '../../components/Tabs';
import TodoList from '../../components/TodoList';
import Notes from '../../components/Note';

import WikiList from '../../components/Wiki/WikiList';
// context
import AuthContext from '../../contexts/auth/authContext';
import { ThemeContext } from '../../contexts/ThemeContext';
// hooks
import useLoadUser from '../../hooks/useLoadUser';

export default function Dashboard() {
  const theme = useContext(ThemeContext);
  const useStyles = makeStyles(materialTheme => ({
    root: {
      flexGrow: 1,
      backgroundColor: materialTheme.palette.background.paper,
      // size of the sidebar
      marginLeft: '0px',
      [materialTheme.breakpoints.up('sm')]: {
        marginLeft: '240px',
      },
    },
    appbar: {
      background: 'white',
      color: theme.primary,
    },
    indicateBg: { background: theme.primary },
  }));
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const token = localStorage.getItem('token');

  useLoadUser();
  return authContext.loading ? (
    <p>Loading ...</p>
  ) : !authContext.isAuthenticated ? (
    <Redirect to="/" />
  ) : (
    <div>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Sidebar />
      <SimpleTabs
        className={classes.root}
        label1="My todos"
        label2="My Notes"
        label3="My Wiki's"
        container1={<TodoList user={authContext.user} token={token} />}
        container2={
          <Notes user={authContext.user} token={token} theme={theme} />
        }
        container3={<WikiList />}
      />
    </div>
  );
}
