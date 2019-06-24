import React, { useContext, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import AuthContext from '../contexts/auth/authContext';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    justifyContent: 'left',
  },
  buttons: {
    flexGrow: 1,
    textAlign: 'end',
    justifyContent: 'flex-end',
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const authContext = useContext(AuthContext);
  const { logout, isAuthenticated } = authContext;

  // Logout
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  // Logout Menu
  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const guest = (
    <Fragment>
      <Button
        component={Link}
        to="/"
        color="inherit"
        className={classes.title}
        aria-label="Home"
      >
        Home
      </Button>
      <div className={classes.buttons}>
        <Button component={Link} to="register-page" color="inherit">
          Register
        </Button>
        <Button component={Link} to="login-page" color="inherit">
          Login
        </Button>
      </div>
    </Fragment>
  );

  const authNav = (
    <Fragment>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="Menu"
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" className={classes.title}>
        My Dashboard
      </Typography>
      <IconButton
        aria-label="Account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
        className={classes.buttons}
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem component={Link} to="/profile">
          My Account
        </MenuItem>
        <MenuItem component={Link} to="/notes">
          Logout
        </MenuItem>
      </Menu>
    </Fragment>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: '#2D9CDB' }}>
        <Toolbar>
          <Fragment>{isAuthenticated ? authNav : guest}</Fragment>
        </Toolbar>
      </AppBar>
    </div>
  );
}
