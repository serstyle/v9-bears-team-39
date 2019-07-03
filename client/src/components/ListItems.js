/* eslint-disable no-nested-ternary */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import Preloader from './Preloader';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function CheckboxList(props) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([-1]);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List className={classes.root}>
      {props.list.map((value, i) =>
        props.todo ? (
          /* Todo */
          <ListItem
            key={i}
            role={undefined}
            dense
            button
            onClick={handleToggle(i)}
          >
            <ListItemText
              style={
                checked.indexOf(i) !== -1
                  ? { textDecoration: 'line-through' }
                  : { textDecoration: 'none' }
              }
              id={i}
              primary={value.title}
              secondary={value.started}
            />
            {props.pending ? (
              <ListItemSecondaryAction>
                <Preloader size={30} />
              </ListItemSecondaryAction>
            ) : (
              /* Not todo */
              <ListItemSecondaryAction
                onClick={() => props.handleDelete(value._id)}
              >
                <IconButton edge="end" aria-label="Delete">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            )}
          </ListItem>
        ) : (
          <React.Fragment key={i}>
            <ListItem role={undefined} dense button onClick={handleToggle(i)}>
              <ListItemText
                id={i}
                primary={value.title}
                secondary={value.body}
              />
              <ListItemSecondaryAction
                onClick={() => props.handleDelete(value._id)}
              >
                <IconButton edge="end" aria-label="Delete">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            {i !== props.list.length - 1 && <Divider light variant="middle" />}
          </React.Fragment>
        )
      )}
    </List>
  );
}
