import React, { useState, useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/core/styles';
// style
import Container from '@material-ui/core/Container';
// component
import Form from '../../components/Form';
import FormTextField from '../../components/FormTextField';
import { ThemeContext } from '../../contexts/ThemeContext';
import OAuthButtons from '../../components/OAuthButtons';
import AuthContext from '../../contexts/auth/authContext';
import AlertContext from '../../contexts/alert/alertContext';
import Alert from '../../components/Alert';

export default function LoginPage(props) {
  const themeContext = useContext(ThemeContext);
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const { login, isAuthenticated, error, clearErrors } = authContext;
  const { setAlert } = alertContext;
  const useStyles = makeStyles(theme => ({
    mainContainer: {
      marginTop: '50px',
      textAlign: 'center',
      alignItems: 'center',
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
      props.history.push('/dashboard');
    }

    if (error === 'Invalid Creditentials') {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [clearErrors, error, isAuthenticated, props.history, setAlert]);

  const [value, setValue] = useState({
    email: '',
    password: '',
  });

  const handleChange = title => e => {
    setValue({ ...value, [title]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { email, password } = value;
    if (email === '' || password === '') {
      setAlert('Please fill in all fields', 'danger');
    } else {
      login({
        email,
        password,
      });
    }
  };
  // eslint-disable-next-line react/prop-types
  return (
    <div>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Container className={classes.titleContainer}>
        <h1 className={classes.h1}>LOGIN</h1>
        <Container className={classes.mainContainer}>
          <Container className={classes.formContainer}>
            <Alert />
            <Form onSubmit={handleSubmit} buttonName="LOGIN">
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
            </Form>
          </Container>
          <OAuthButtons
            titleGithub="Sign in with Github"
            titleGitlab="Sign in with Gitlab"
            titleGoogle="Sign in with Google"
          />
        </Container>
      </Container>
    </div>
  );
}
