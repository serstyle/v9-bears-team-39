import React, { useContext } from 'react';
// Styling
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import DefaultButton from './DefaultButton';
import { ThemeContext } from '../contexts/ThemeContext';

export default function Form(props) {
  const themeContext = useContext(ThemeContext);
  const useStyles = makeStyles(() => ({
    container: {
      padding: 25,
      background: themeContext.primary,
      textAlign: 'center',
      borderRadius: 5,
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
    button: {
      marginBottom: 10,
    },
  }));
  const classes = useStyles();
  // eslint-disable-next-line react/prop-types
  const { children, onSubmit, buttonName } = props;
  return (
    <Container className={classes.container}>
      <form className={classes.form} noValidate autoComplete="off">
        {children}
      </form>
      <DefaultButton
        name={buttonName}
        onClick={onSubmit}
        className={classes.button}
        variant="contained"
        color="secondary"
        size="large"
      />
    </Container>
  );
}
