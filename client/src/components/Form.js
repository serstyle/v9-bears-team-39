import React, { useContext } from 'react';
// Styling
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormButton from './FormButton';
import { ThemeContext } from '../contexts/ThemeContext';

export default function Form(props) {
  const themeContext = useContext(ThemeContext);
  const useStyles = makeStyles(theme => ({
    container: {
      padding: '10px',
      background: themeContext.primary,
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
