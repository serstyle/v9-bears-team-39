import React from 'react';
// Styling
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() => ({
  button: {
    marginBottom: 10,
  },
}));

export default function FormButton(props) {
  const classes = useStyles();
  // eslint-disable-next-line react/prop-types
  const { name, onSubmit } = props;
  return (
    <Button
      className={classes.button}
      variant="contained"
      size="large"
      color="secondary"
      onClick={onSubmit}
    >
      {name}
    </Button>
  );
}
