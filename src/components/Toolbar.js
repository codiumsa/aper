import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { AuthenticationContext } from './Authenticator';

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
  }
}));

const AperToolbar = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { logoutUser, authState } = useContext(AuthenticationContext);
  const handleAvatarClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.mainContainer}>
      <AppBar className={classes.appBar} color="default">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit">
            Aper
          </Typography>
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
            <MenuItem onClick={logoutUser}>Logout</MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default AperToolbar;
