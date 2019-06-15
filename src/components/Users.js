import React, { useState, useContext, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import '../assets/main.css';
import { Avatar, Typography } from '@material-ui/core';
import { AuthenticationContext } from './Authenticator';

const useStyles = makeStyles(theme => ({
  avatar: {
    backgroundColor: '#FFC09F',
    width: '15px',
    height: '15px',
    fontSize: '12px',
    marginRight: '5px',
    marginLeft: '5px',
    color: 'black'
  },
  userAvatar: {
    margin: 10,
    width: 120,
    height: 120
  },
  userName: {
    textAlign: 'center'
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    minHeight: '100vh',
    background: '#508991'
  },
  card: {
    // background: '#FFC09F'
    margin: theme.spacing(),
    width: '90%',
    maxWidth: '960px',
    padding: '30px 95px',
    borderRadius: 10,
    [theme.breakpoints.down('md')]: {
      padding: '65px 65px 8px 48px'
    },
    [theme.breakpoints.down('sm')]: {
      padding: '65px 15px 8px 15px'
    }
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'row'
  },
  gridList: {
    width: 800,
    height: '100%',
    justifyContent: 'center',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)'
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
  },
  icon: {
    color: 'white'
  },
  title: {
    fontSize: '12px'
  },
  button: {
    margin: '0 auto',
    marginTop: theme.spacing(2),
    width: '50%'
  },
  badge: {
    top: '50%',
    right: -3
  }
}));

const mockUsers = [
  {
    googleId: 'xyzs',
    imageUrl:
      'https://lh5.googleusercontent.com/-cjXARxr1bNk/AAAAAAAAAAI/AAAAAAAAEHs/z7mrce9yPuc/s96-c/photo.jpg',
    givenName: 'Guillermo',
    familyName: 'Peralta Scura'
  },
  {
    googleId: 'abc',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=707b9c33066bf8808c934c8ab394dff6',
    givenName: 'Jane',
    familyName: 'Doe'
  },
  {
    googleId: 'def',
    imageUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
    givenName: 'Gabriela',
    familyName: 'Doe'
  },
  {
    googleId: 'ghi',
    imageUrl: 'https://randomuser.me/api/portraits/women/38.jpg',
    givenName: 'Jennifer',
    familyName: 'Doe'
  },
  {
    googleId: 'jkl',
    imageUrl: 'https://randomuser.me/api/portraits/women/27.jpg',
    givenName: 'Alexa',
    familyName: 'Doe'
  }
];

const Users = () => {
  const context = useContext(AuthenticationContext);
  const classes = useStyles();
  const [users, setUsers] = useState(
    mockUsers.map(user => ({ ...user, hovering: false }))
  );
  const [nextOrder, setNextOrder] = useState(1);
  const handleClick = currentUser => {
    if (currentUser.order) {
      // Remove from list
      const shiftingNumber = currentUser.order;
      setUsers(
        users.map(user => {
          if (user.googleId === currentUser.googleId) {
            return { ...user, order: null };
          }
          if (user.order > shiftingNumber) {
            const u = { ...user, order: user.order - 1 };
            return u;
          }
          return user;
        })
      );
      setNextOrder(nextOrder - 1);
    } else {
      setUsers(
        users.map(user => {
          if (user.googleId === currentUser.googleId) {
            return { ...user, order: nextOrder };
          }
          return user;
        })
      );
      setNextOrder(nextOrder + 1);
    }
  };

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <GridList
            cellHeight={200}
            cols={5}
            spacing={10}
            className={classes.gridList}
          >
            {users.map(user => {
              return (
                <GridListTile
                  key={user.googleId}
                  cols={1}
                  rows={1}
                  onClick={() => handleClick(user)}
                >
                  {/* <Badge badgeContent={user.order} className={classes.badge} color="primary"> */}
                  <Avatar
                    src={user.imageUrl}
                    alt={user.givenName}
                    className={classes.userAvatar}
                  />
                  {/* </Badge> */}

                  <div className={classes.userName}>
                    <Badge
                      badgeContent={user.order}
                      className={classes.badge}
                      color="primary"
                    >
                      {user.givenName}
                    </Badge>
                  </div>
                </GridListTile>
              );
            })}
          </GridList>
        </CardContent>
        <CardActions>
          <Fab className={classes.button} color="primary" variant="extended">
            Guardar
          </Fab>
        </CardActions>
      </Card>
    </div>
  );
};

export default Users;
