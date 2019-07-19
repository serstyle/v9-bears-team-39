/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
// style
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AccessibilityNew from '@material-ui/icons/AccessibilityNew';
import Work from '@material-ui/icons/Work';
import Directions from '@material-ui/icons/Directions';

import Home from '@material-ui/icons/Home';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AuthContext from '../contexts/auth/authContext';
// context
import { ThemeContext } from '../contexts/ThemeContext';

const drawerWidth = 240;

export default function ResponsiveDrawer(props) {
  const theme = useContext(ThemeContext);
  const authContext = useContext(AuthContext);
  const { logout } = authContext;
  const { container } = props;

  const themeMaterial = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // Logout
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  // Style
  const useStyles = makeStyles(T => ({
    root: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    drawer: {
      [T.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      background: theme.primary,
      marginLeft: drawerWidth,
      [T.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
      },
    },
    title: {
      marginLeft: 10,
    },
    menuButton: {
      marginRight: T.spacing(2),
      [T.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    drawerPaper: {
      color: 'white',
      background: theme.third,
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
    },
    icon: {
      paddingRight: 10,
    },
    listItem: {
      color: 'yellow',
    },
    underDev: {
      color: 'yellow',
      fontWeight: 'bold',
      fontSize: 10,
    },
  }));
  const classes = useStyles();
  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  // Logout Menu
  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const drawer = (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <h2 className={classes.title}>Dashboard</h2>
        <Divider />
        <List>
          <ListItem button component={Link} to="dashboard">
            <Home className={classes.icon} />
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} to="/profile">
            <AccountCircle className={classes.icon} />
            <ListItemText primary="My Account" />
          </ListItem>
          <ListItem style={{ marginTop: 20 }}>
            <ListItemText className={classes.underDev}>
              Under Developement
            </ListItemText>
          </ListItem>
          <ListItem
            button
            className={classes.listItem}
            component={Link}
            to="/profile"
          >
            <Directions className={classes.icon} />
            <ListItemText primary="My Roadmap" />
          </ListItem>
          <ListItem
            button
            className={classes.listItem}
            component={Link}
            to="/profile"
          >
            <AccessibilityNew className={classes.icon} />
            <ListItemText primary="Dev Buddies" />
          </ListItem>
          <ListItem
            button
            className={classes.listItem}
            component={Link}
            to="/profile"
          >
            <Work className={classes.icon} />
            <ListItemText primary="Courses" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.root}>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Dev Dashboard
          </Typography>
          <div>
            <IconButton
              aria-label="Account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
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
              <MenuItem onClick={logout} component={Link} to="/">
                Logout
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="Mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={themeMaterial.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
      </main>
    </div>
  );
}
