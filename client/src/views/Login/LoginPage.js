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

export default function LoginPage() {
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
    password: '',
  });

  const handleChange = title => e => {
    setValue({ ...value, [title]: e.target.value });
  };

  const handleSubmit = () => {
    if (value.name && value.password) {
      console.log('submitted');
    } else console.log('errors');
  };
  // eslint-disable-next-line react/prop-types
  return (
    <div>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Navbar />
      <Container className={classes.titleContainer}>
        <h1 className={classes.h1}>LOGIN</h1>
        <Container className={classes.mainContainer}>
          <Container className={classes.formContainer}>
            <Form onSubmit={handleSubmit} buttonName="LOGIN">
              <FormTextField
                id="name"
                label="Name"
                value={value.name}
                onChange={handleChange('name')}
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
