import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InfoIcon from '@material-ui/icons/Info';
import AlertContext from '../contexts/alert/alertContext';
import { ThemeContext } from '../contexts/ThemeContext';

const Alerts = () => {
  const theme = useContext(ThemeContext);
  const useStyles = makeStyles(() => ({
    wrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      marginTop: '1rem',
    },
    success: {
      backgroundColor: theme.success,
      marginBottom: '1rem',
    },
    error: {
      backgroundColor: theme.error,
      marginBottom: '1rem',
      color: theme.textWhite,
    },
    icon: {
      marginRight: 5,
    },
  }));
  const alertContext = useContext(AlertContext);
  const classes = useStyles();
  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map(alert => (
      <div
        key={alert.id}
        className={`${classes.wrapper} +''+ ${classes[alert.type]}`}
      >
        <InfoIcon className={classes.icon} />
        {alert.msg}
      </div>
    ))
  );
};

export default Alerts;
