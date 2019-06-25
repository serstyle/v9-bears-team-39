import React, { useState, useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/core/styles';
// style
import Container from '@material-ui/core/Container';
// component
import Form from '../../components/Form';
import FormTextField from '../../components/FormTextField';
import { ThemeContext } from '../../contexts/ThemeContext';
// eslint-disable-next-line import/no-named-as-default
import AuthContext from '../../contexts/auth/authContext';
import AlertContext from '../../contexts/alert/alertContext';
import Alert from '../../components/Alert';

export default function ProfilePage(props) {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const { updateUser, user } = authContext;
  const { setAlert } = alertContext;
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
  });

  const { name, email, password } = value;

  const handleChange = title => e => {
    setValue({ ...value, [title]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    updateUser({
      name,
      email,
      password,
    });
    // eslint-disable-next-line react/prop-types
  };

  return (
    <div>
      <Helmet>
        <title>My Account</title>
      </Helmet>
      <Container className={classes.titleContainer}>
        <h1 className={classes.h1}>MY ACCOUNT</h1>
        <Container className={classes.mainContainer}>
          <Container className={classes.formContainer}>
            <Alert />
            <Form
              onSubmit={handleSubmit}
              style={{ marginTop: 10 }}
              buttonName="Save changes"
            >
              <FormTextField
                id="name"
                label="Update Name"
                value={name}
                onChange={handleChange('name')}
              />
              <FormTextField
                id="email"
                label="Update Email"
                value={email}
                onChange={handleChange('email')}
              />
              <FormTextField
                id="password"
                label="Password"
                value={password}
                onChange={handleChange('password')}
              />
            </Form>
          </Container>
        </Container>
      </Container>
    </div>
  );
}
