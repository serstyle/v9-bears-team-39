import React, { useState, useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/core/styles';
// style
import Container from '@material-ui/core/Container';
// component
import Navbar from '../../components/Navbar';
import Form from '../../components/Form';
import FormTextField from '../../components/FormTextField';
import { ThemeContext } from '../../contexts/ThemeContext';
// eslint-disable-next-line import/no-named-as-default
import OAuthButtons from '../../components/OAuthButtons';
import AuthContext from '../../contexts/auth/authContext';

export default function RegistrationPage(props) {
  const authContext = useContext(AuthContext);
  const { register, isAuthenticated, error } = authContext;
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

  useEffect(() => {
    if (isAuthenticated) {
      // eslint-disable-next-line react/prop-types
      props.history.push('/');
    }

    if (error === 'User already exists') {
      alert(error, 'danger');
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [value, setValue] = useState({
    name: '',
    email: '',
    password: '',
    confirmation: '',
  });

  const { name, email, password, confirmation } = value;

  const handleChange = title => e => {
    setValue({ ...value, [title]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const validName = name.length > 2;
    const validPassword = password.length > 4;
    const validEmail =
      email.length > 5 && email.includes('@') && email.includes('.');
    if (name === '' || email === '' || password === '') {
      alert('Plase fill all required fields');
    } else if (password !== confirmation) {
      alert('Passwords do not match');
    } else if (
      validName &&
      validEmail &&
      validPassword &&
      confirmation === password
    )
      register({
        name,
        email,
        password,
      });
    alert('success');
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
                value={name}
                onChange={handleChange('name')}
              />
              <FormTextField
                id="email"
                label="Email"
                value={email}
                onChange={handleChange('email')}
              />
              <FormTextField
                id="password"
                label="Password"
                value={password}
                onChange={handleChange('password')}
              />
              <FormTextField
                id="confirmation"
                label="Confirm Password"
                value={confirmation}
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
