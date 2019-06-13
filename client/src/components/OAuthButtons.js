import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DefaultButton from './DefaultButton';
import { ThemeContext } from '../contexts/ThemeContext';

export default function OAuthButtons(props) {
  const theme = useContext(ThemeContext);
  const useStyles = makeStyles(() => ({
    root: {
      marginTop: '50px',
    },
    github: {
      backgroundColor: theme.github,
      '&:hover': {
        backgroundColor: theme.github,
      },
      color: theme.textWhite,
      marginBottom: 20,
      width: '-webkit-fill-available',
    },
    gitlab: {
      backgroundColor: theme.gitlab,
      '&:hover': {
        backgroundColor: theme.gitlab,
      },
      color: theme.textWhite,
      marginBottom: 20,
      width: '-webkit-fill-available',
    },
    google: {
      backgroundColor: theme.google,
      '&:hover': {
        backgroundColor: theme.google,
      },
      color: theme.textWhite,
      width: '-webkit-fill-available',
    },
  }));

  const classes = useStyles();
  // eslint-disable-next-line react/prop-types
  const { titleGithub, titleGitlab, titleGoogle, onSubmit } = props;
  // eslint-disable-next-line react/prop-types
  return (
    <div className={classes.root}>
      <DefaultButton
        name={titleGithub}
        onClick={onSubmit}
        className={classes.github}
        variant="contained"
        size="large"
      />
      <DefaultButton
        name={titleGitlab}
        onClick={onSubmit}
        className={classes.gitlab}
        variant="contained"
        size="large"
      />
      <DefaultButton
        name={titleGoogle}
        onClick={onSubmit}
        className={classes.google}
        variant="contained"
        size="large"
      />
    </div>
  );
}
