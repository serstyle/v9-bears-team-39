/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ThemeContext } from '../contexts/ThemeContext';

export default function CircularIndeterminate({
  color = 'primary',
  size = 40,
}) {
  const theme = useContext(ThemeContext);
  const useStyles = makeStyles(() => ({
    colorPrimary: { color: theme.primary },
  }));
  const classes = useStyles();

  return (
    <div>
      <CircularProgress
        className={classes.colorPrimary}
        color={color}
        size={size}
      />
    </div>
  );
}
