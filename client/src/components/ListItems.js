/* eslint-disable no-nested-ternary */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
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

  const listPropsTitle = props.list;

  return (
    <List className={classes.root}>
      {[0, 1, 2, 3].map((value, i) => (
        <ListItem
          key={value}
          role={undefined}
          dense
          button
          onClick={handleToggle(value)}
        >
          <ListItemText
            style={
              props.todo
                ? checked.indexOf(value) !== -1
                  ? { textDecoration: 'line-through' }
                  : { textDecoration: 'none' }
                : null
            }
            id={i}
            primary={listPropsTitle[i]}
            secondary={listPropsTitle[i]}
          />
        </ListItem>
      ))}
    </List>
  );
}
