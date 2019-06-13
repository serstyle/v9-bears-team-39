import React from 'react';
import { Helmet } from 'react-helmet';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
// style
import Container from '@material-ui/core/Container';

// component
import Navbar from '../../components/Navbar';
import DefaultButton from '../../components/DefaultButton';

const useStyles = makeStyles(() => ({
  container: {
    paddingTop: '20px',
    height: '90vh',
    marginTop: '5%',
  },
  title: {
    textAlign: 'left',
    color: '#2D9CDB',
    textTransform: 'uppercase',
    fontSize: '2.5rem',
    marginBottom: 0,
  },
  descriptionText: {
    maxWidth: '50%',
    textAlign: 'left',
    color: '#2D9CDB',
    textTransform: 'uppercase',
    fontSize: '1.7rem',
    marginTop: '10px',
  },
  link: {
    textDecoration: 'none',
  },
}));

export default function HomePage() {
  const classes = useStyles();
  return (
    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Navbar />
      <Container className={classes.container}>
        <h1 className={classes.title}>Dev Dashboard</h1>
        <h2 className={classes.descriptionText}>
          Start to organize and enhance your developper carreer
        </h2>
        <Link className={classes.link} to="register-page">
          <DefaultButton name="Get Started" />
        </Link>
      </Container>
    </div>
  );
}
