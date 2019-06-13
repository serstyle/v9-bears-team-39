import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() => ({
  button: {
    color: '#2D9CDB',
  },
}));

export default function OutlinedButtons(props) {
  const classes = useStyles();
  // eslint-disable-next-line react/prop-types
  const { name } = props;
  return (
    <Button variant="outlined" className={classes.button}>
      {name}
    </Button>
  );
}
