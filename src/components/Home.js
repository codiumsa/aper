import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AuthenticationContext } from './Authenticator';
import useMobileDetect from 'use-mobile-detect-hook';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import '../assets/main.css';
import { Avatar } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  avatar: {
    backgroundColor: 'red',
    width: '15px',
    height: '15px',
    fontSize: '12px',
    marginRight: '5px',
    marginLeft: '5px'
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    minHeight: '100vh',
    background: '#FFC09F'
  },
  gridList: {
    maxWidth: 800,
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
const Home = () => {
  const context = useContext(AuthenticationContext);
  const detectMobile = useMobileDetect();
  const classes = useStyles();
  const [users, setUsers] = useState(
    mockUsers.map(user => ({ ...user, hovering: false }))
  );
  const [nextOrder, setNextOrder] = useState(1);
  const handleClick = currentUser => {
    if (currentUser.order) {
      // Remove from list
      let shiftingNumber = currentUser.order;
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

  const handleSaveClick = () => {
    const usersSortedByOrder = users.sort((a, b) =>
      a.order > b.order ? 1 : -1
    );
    // TODO: API call
    console.log(usersSortedByOrder);
  };

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <GridList
            cellHeight={100}
            cols={detectMobile.isMobile() ? 2 : 6}
            spacing={30}
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
                  <img src={user.imageUrl} alt={user.givenName} />
                  <GridListTileBar
                    title={user.givenName}
                    titlePosition="top"
                    actionIcon={
                      user.order ? (
                        <Avatar
                          className={classes.avatar}
                        >{`${user.order}`}</Avatar>
                      ) : null
                    }
                    actionPosition="left"
                    className={classes.titleBar}
                  />
                </GridListTile>
              );
            })}
          </GridList>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleSaveClick()}
          >
            Guardar
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default Home;
