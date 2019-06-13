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

export default function LoginPage() {
  const theme = useContext(ThemeContext);
  const useStyles = makeStyles(() => ({
    root: {
      marginTop: '50px',
      height: '50vh',
    },
    h1: {
      textAlign: 'left',
      color: theme.primary,
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
  return (
    <div>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Navbar />
      <Container className={classes.root}>
        <h1 className={classes.h1}>LOGIN</h1>
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
    </div>
  );
}
