import React, { useState, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/core/styles';
// style
import Container from '@material-ui/core/Container';
// component
import Navbar from '../../components/Navbar';
import Form from '../../components/Form';
import FormTextField from '../../components/FormTextField';
import { ThemeContext } from '../../contexts/ThemeContext';
import OAuthButtons from '../../components/OAuthButtons';

export default function RegistrationPage() {
  const themeContext = useContext(ThemeContext);
  const useStyles = makeStyles(theme => ({
    mainContainer: {
      marginTop: '50px',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'row',
      [theme.breakpoints.down('xs')]: {
        flexWrap: 'wrap',
      },
    },
    titleContainer: {
      marginTop: '50px',
    },
    formContainer: {
      display: 'flex',
      flexDirection: 'column',
    },
    h1: {
      textAlign: 'left',
      color: themeContext.primary,
    },
  }));

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
    <div>
      <Helmet>
        <title>Registration</title>
      </Helmet>
      <Navbar />
      <Container className={classes.titleContainer}>
        <h1 className={classes.h1}>REGISTRATION</h1>
        <Container className={classes.mainContainer}>
          <Container className={classes.formContainer}>
            <Form onSubmit={handleSubmit} buttonName="REGISTRATION">
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
            </Form>
          </Container>
          <OAuthButtons
            titleGithub="Register with Github"
            titleGitlab="Register with Gitlab"
            titleGoogle="Register with Google"
          />
        </Container>
      </Container>
    </div>
  );
}
