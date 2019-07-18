import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DefaultButton from './DefaultButton';
import { ThemeContext } from '../contexts/ThemeContext';
import { GitlabIcon, GithubIcon, GoogleIcon } from '../assets/icons';

export default function OAuthButtons(props) {
  const themeContext = useContext(ThemeContext);
  const useStyles = makeStyles(theme => ({
    github: {
      backgroundColor: themeContext.github,
      '&:hover': {
        backgroundColor: themeContext.github,
      },
      color: themeContext.textWhite,
      marginBottom: 20,
      width: '-webkit-fill-available',
    },
    gitlab: {
      backgroundColor: themeContext.gitlab,
      '&:hover': {
        backgroundColor: themeContext.gitlab,
      },
      color: themeContext.textWhite,
      marginBottom: 20,
      width: '-webkit-fill-available',
    },
    google: {
      backgroundColor: themeContext.google,
      '&:hover': {
        backgroundColor: themeContext.google,
      },
      color: themeContext.textWhite,
      marginBottom: 20,
      width: '-webkit-fill-available',
    },
    icon: {
      marginRight: 20,
      paddingTop: 5,
      [theme.breakpoints.down('xs')]: {
        marginRight: 10,
      },
    },
    h5: {
      fontWeight: 500,
      color: themeContext.secondary,
    },
  }));

  const classes = useStyles();
  // eslint-disable-next-line react/prop-types
  const { titleGithub, titleGitlab, titleGoogle, onSubmit } = props;
  // eslint-disable-next-line react/prop-types
  return (
    <div>
      <h5 className={classes.h5}>Feature Under developement. Coming soon !</h5>
      <DefaultButton
        name={titleGithub}
        icon={<div className={classes.icon}>{GithubIcon}</div>}
        onClick={onSubmit}
        className={classes.github}
        variant="contained"
      />
      <DefaultButton
        name={titleGitlab}
        icon={<div className={classes.icon}>{GitlabIcon}</div>}
        onClick={onSubmit}
        className={classes.gitlab}
        variant="contained"
      />
      <DefaultButton
        name={titleGoogle}
        icon={<div className={classes.icon}>{GoogleIcon}</div>}
        onClick={onSubmit}
        className={classes.google}
        variant="contained"
      />
    </div>
  );
}
