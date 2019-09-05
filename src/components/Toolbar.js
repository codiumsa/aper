import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { AuthenticationContext } from './Authenticator';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: '#6F9EA5',
    color: '#fff'
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'center'
  },
  userAvatar: {
    color: '#fff',
    marginRight: 'auto',
    backgroundColor: theme.palette.primary.dark,
    position: 'absolute',
    right: theme.spacing(3),
    width: 45,
    height: 45
  },
  usersButton: {
    margin: 'auto',
    position: 'absolute',
    right: theme.spacing(10),
    color: 'white'
  }
}));

const AperToolbar = ({ history }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { logoutUser, authState } = useContext(AuthenticationContext);

  const currentUserString = localStorage.getItem('currentUser');
  let currentUser = {};
  if (currentUserString) {
    currentUser = JSON.parse(currentUserString);
  }

  const handleAvatarClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserClick = event => {
    setAnchorElUser(event.currentTarget);
  };

  const routeUsersOrder = () => {
    history.push('users_order');
  };

  const routeUsersRoles = () => {
    history.push('users_roles');
  };

  const routeUsersDelete = () => {
    history.push('users_delete');
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseUser = () => {
    setAnchorElUser(null);
  };

  return (
    <div className={classes.mainContainer}>
      {authState.loggedIn && (
        <AppBar className={classes.appBar} color="default">
          <Toolbar className={classes.toolbar}>
            <Link
              style={{
                textDecoration: 'none',
                color: 'white',
                fontSize: '150%'
              }}
              to="/home"
            >
              Aper
            </Link>
            <Avatar
              onClick={handleAvatarClick}
              className={classes.userAvatar}
              src={authState.userData.profileObj.imageUrl}
            />
            <Menu
              id="lock-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={logoutUser}>
                Logout
                {/*                <GoogleLogout
                  clientId={process.env.REACT_APP_GOOGLE_CID}
                  buttonText="Logout"
                  onLogoutSuccess={logoutUser}
                >
                </GoogleLogout>*/}
              </MenuItem>
            </Menu>

            {currentUser.role === 'ADMIN' && (
              <Button className={classes.usersButton} onClick={handleUserClick}>
                Users
              </Button>
            )}
            <Menu
              id="lock-menu"
              anchorEl={anchorElUser}
              keepMounted
              open={Boolean(anchorElUser)}
              onClose={handleCloseUser}
            >
              <MenuItem onClick={routeUsersOrder}>Priorities </MenuItem>
              <MenuItem onClick={routeUsersRoles}>Roles</MenuItem>
              <MenuItem onClick={routeUsersDelete}>Delete</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      )}
    </div>
  );
};

const AperToolbarWithRouter = withRouter(AperToolbar);
export default AperToolbarWithRouter;
