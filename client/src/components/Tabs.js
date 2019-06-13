/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// style
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

// components
import ListItems from './ListItems';
// context
import { ThemeContext } from '../contexts/ThemeContext';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

export default function SimpleTabs() {
  const theme = useContext(ThemeContext);
  const useStyles = makeStyles(materialTheme => ({
    root: {
      flexGrow: 1,
      backgroundColor: materialTheme.palette.background.paper,
      // size of the sidebar
      marginLeft: '0px',
      [materialTheme.breakpoints.up('sm')]: {
        marginLeft: '240px',
      },
    },
    appbar: {
      background: 'white',
      color: theme.primary,
    },
    indicateBg: { background: theme.primary },
  }));
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Tabs
          classes={{ indicator: classes.indicateBg }}
          value={value}
          onChange={handleChange}
        >
          <Tab label="My Todo" />
          <Tab label="My Notes" />
          <Tab label="My Wiki's" />
        </Tabs>
      </AppBar>
      {value === 0 && (
        <TabContainer>
          <ListItems
            todo
            list={['todo1', 'todo2', 'todo3', 'todo4', 'todo5']}
          />
        </TabContainer>
      )}
      {value === 1 && (
        <TabContainer>
          <ListItems
            todo={false}
            list={['Note1', 'Note2', 'Note3', 'Note4', 'Note5']}
          />
        </TabContainer>
      )}
      {value === 2 && (
        <TabContainer>
          <ListItems
            todo={false}
            list={['Wiki1', 'Wiki2', 'Wiki3', 'Wiki4', 'Wiki5']}
          />
        </TabContainer>
      )}
    </div>
  );
}
