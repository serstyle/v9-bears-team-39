import React from 'react';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/core/styles';
// style
import Container from '@material-ui/core/Container';
// component
import Navbar from '../../components/Navbar';
import RegistrationForm from '../../components/RegistrationForm';

const useStyles = makeStyles(() => ({
  root: {
    marginTop: '50px',
    height: '50vh',
  },
  h1: {
    textAlign: 'left',
    color: '#2D9CDB',
  },
}));

export default function RegistrationPage() {
  const classes = useStyles();
  return (
    <div>
      <Helmet>
        <title>Registration</title>
      </Helmet>
      <Navbar />
      <Container className={classes.root}>
        <h1 className={classes.h1}>REGISTRATION</h1>
        <RegistrationForm />
      </Container>
    </div>
  );
}
