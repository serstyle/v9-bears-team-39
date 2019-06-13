import React from 'react';
// Styling
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormButton from './FormButton';

const useStyles = makeStyles(theme => ({
  container: {
    padding: '10px',
    background: '#2D9CDB',
    textAlign: 'center',
    maxWidth: '40%',
    marginLeft: 40,
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100vw',
      marginLeft: 'auto',
    },
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 30,
  },
  textField: {
    width: '-webkit-fill-available',
    backgroundColor: '#ffffff',
  },
}));

export default function Form(props) {
  const classes = useStyles();
  // eslint-disable-next-line react/prop-types
  const { children, onSubmit, buttonName } = props;
  return (
    <Container className={classes.container}>
      <form className={classes.form} noValidate autoComplete="off">
        {children}
      </form>
      <FormButton name={buttonName} onSubmit={onSubmit} />
    </Container>
  );
}
