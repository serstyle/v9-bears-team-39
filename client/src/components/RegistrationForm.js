import React, { useState } from 'react';
// Styling
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormButton from './FormButton';
import FormTextField from './FormTextField';

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

export default function RegistrationForm() {
  const classes = useStyles();
  const [value, setValue] = useState({
    name: '',
    email: '',
    password: '',
    confirmation: '',
  });

  const handleChange = title => e => {
    setValue({ ...value, [title]: e.target.value });
  };

  const handleSubmit = () => {
    const validName = value.name.length > 2;
    const validPassword = value.password.length > 4;
    const validEmail =
      value.email.length > 5 &&
      value.email.includes('@') &&
      value.email.includes('.');
    if (
      validName &&
      validEmail &&
      validPassword &&
      value.confirmation === value.password
    ) {
      console.log('submitted');
    } else console.log('errors');
  };
  // eslint-disable-next-line react/prop-types
  return (
    <Container className={classes.container}>
      <form className={classes.form} noValidate autoComplete="off">
        <FormTextField
          id="name"
          label="Name"
          value={value.name}
          onChange={handleChange('name')}
        />
        <FormTextField
          id="email"
          label="Email"
          value={value.email}
          onChange={handleChange('email')}
        />
        <FormTextField
          id="password"
          label="Password"
          value={value.password}
          onChange={handleChange('password')}
        />
        <FormTextField
          id="confirmation"
          label="Confirm Password"
          value={value.confirmation}
          onChange={handleChange('confirmation')}
        />
      </form>
      <FormButton name="REGISTRATION" onSubmit={handleSubmit} />
    </Container>
  );
}
