import React from 'react';
// Styling
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(() => ({
  textField: {
    width: '-webkit-fill-available',
    backgroundColor: '#ffffff',
  },
}));

export default function FormButton(props) {
  const classes = useStyles();
  // eslint-disable-next-line react/prop-types
  const { id, label, value, onChange } = props;
  return (
    <TextField
      className={classes.textField}
      required
      id={id}
      label={label}
      value={value}
      onChange={onChange}
      margin="normal"
    />
  );
}
