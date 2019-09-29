/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// style
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Typography from '@material-ui/core/Typography';

// context
import { ThemeContext } from '../contexts/ThemeContext';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}
export default function SimpleTabs(props) {
  const theme = useContext(ThemeContext);

  const useStyles = makeStyles(materialTheme => ({
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
  const { label1, label2, label3, container1, container2, container3, className } = props;
  return (
    <div className={className}>
      <AppBar position="static" className={classes.appbar}>
        <Tabs
          variant="fullWidth"
          classes={{ indicator: classes.indicateBg }}
          value={value}
          onChange={handleChange}
        >
          <Tab label={label1} />
          <Tab label={label2} />
          {container3 ? <Tab label={label3} /> : null}
        </Tabs>
      </AppBar>
      {value === 0 && <TabContainer>{container1}</TabContainer>}
      {value === 1 && <TabContainer>{container2}</TabContainer>}
      {value === 2 && <TabContainer>{container3}</TabContainer>}
    </div>
  );
}
