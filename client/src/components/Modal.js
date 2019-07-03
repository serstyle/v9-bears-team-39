/* eslint-disable react/destructuring-assignment */
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  },
}));

function SimpleModal(props) {
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    setOpen(false);
  }, [props.items]);
  // maybe useEffect and each time note change setOpen:false
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();

  return (
    <div>
      <Button
        className={props.button}
        variant="contained"
        color="secondary"
        onClick={handleOpen}
      >
        {props.name}
      </Button>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div className={classes.paper}>{props.children}</div>
      </Modal>
    </div>
  );
}

export default SimpleModal;
