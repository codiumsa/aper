import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Fab from '@material-ui/core/Fab';
import Badge from '@material-ui/core/Badge';
import '../assets/main.css';
import { Avatar } from '@material-ui/core';
import useMobileDetect from 'use-mobile-detect-hook';
import axios from '../utils/axios';
import Toolbar from './Toolbar';
import { useTranslation } from 'react-i18next';
import { SnackbarContext } from './Snackbar.context';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    display: 'flex',
    flex: '1',
    flexDirection: 'column',
    minHeight: '100vh',
    background: '#508991'
  },
  avatar: {
    backgroundColor: '#FFC09F',
    width: '15px',
    marginRight: '5px',
    marginLeft: '5px',
    height: '15px',
    fontSize: '12px',
    color: 'black'
  },
  userAvatar: {
    display: 'block',
    margin: 'auto',
    width: 120,
    height: 120
  },
  cardContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    alignItems: 'center'
  },
  card: {
    margin: theme.spacing(),
    width: '90%',
    maxWidth: '960px',
    padding: '30px 95px',
    borderRadius: 10,
    [theme.breakpoints.down('md')]: {
      padding: '0px 65px 8px 48px'
    },
    [theme.breakpoints.down('sm')]: {
      padding: '0px 15px 8px 15px'
    }
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'row'
  },
  gridList: {
    maxWidth: 800,
    height: '100%',
    justifyContent: 'center',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)'
  },
  gridListTile: {
    justifyContent: 'center'
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
  details: {
    textAlign: 'center'
  },
  badge: {
    margin: 15
  }
}));

const mockUsers = [
  {
    id: 34,
    googleId: 'xyzs',
    imageUrl:
      'https://lh5.googleusercontent.com/-cjXARxr1bNk/AAAAAAAAAAI/AAAAAAAAEHs/z7mrce9yPuc/s96-c/photo.jpg',
    givenName: 'Guillermo',
    familyName: 'Peralta Scura'
  },
  {
    id: 35,
    googleId: 'abc',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=707b9c33066bf8808c934c8ab394dff6',
    givenName: 'Jane',
    familyName: 'Doe'
  },
  {
    id: 36,
    googleId: 'def',
    imageUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
    givenName: 'Gabriela',
    familyName: 'Doe'
  },
  {
    id: 37,
    googleId: 'ghi',
    imageUrl: 'https://randomuser.me/api/portraits/women/38.jpg',
    givenName: 'Jennifer',
    familyName: 'Doe'
  },
  {
    id: 38,
    googleId: 'jkl',
    imageUrl: 'https://randomuser.me/api/portraits/women/27.jpg',
    givenName: 'Alexa',
    familyName: 'Doe'
  }
];

const Users = () => {
  const classes = useStyles();
  const detectMobile = useMobileDetect();
  const { t } = useTranslation();
  const snackBarContext = useContext(SnackbarContext);

  const [users, setUsers] = useState(
    mockUsers.map(user => ({ ...user, hovering: false }))
  );
  const [nextOrder, setNextOrder] = useState(1);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('users');
      setUsers(result.data);
      setNextOrder(
        Math.max.apply(Math, result.data.map(user => user.order)) + 1
      );
    };
    fetchData();
  }, []);

  const handleClick = currentUser => {
    if (currentUser.order) {
      // Remove from list
      const shiftingNumber = currentUser.order;
      setUsers(
        users.map(user => {
          if (user.id === currentUser.id) {
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
          if (user.id === currentUser.id) {
            return { ...user, order: nextOrder };
          }
          return user;
        })
      );
      setNextOrder(nextOrder + 1);
    }
  };

  const handleSaveClick = async () => {
    const updatedUsers = users.slice();
    const bodyFormData = new FormData();
    bodyFormData.set('ids', updatedUsers.map(x => x.order).join());
    try {
      const result = await axios({
        method: 'post',
        url: 'users',
        data: bodyFormData,
        config: { headers: { 'Content-Type': 'multipart/form-data' } }
      });
      if (result.data) snackBarContext.openSnackbar(result.data, 'success');
    } catch (e) {
      if (e.request && e.request.response)
        snackBarContext.openSnackbar(e.request.response, 'error');
    }
  };

  return (
    <div className={classes.mainContainer}>
      <Toolbar />
      <div className={classes.cardContainer}>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <GridList
              cellHeight={200}
              cols={detectMobile.isMobile() ? 1 : 3}
              spacing={10}
              className={classes.gridList}
            >
              {users.map(user => {
                return (
                  <GridListTile
                    key={user.id}
                    cols={1}
                    rows={1}
                    onClick={() => handleClick(user)}
                  >
                    <Avatar
                      src={user.avatar}
                      alt={user.name}
                      className={classes.userAvatar}
                    />
                    <div className={classes.details}>
                      <Badge
                        badgeContent={user.order !== '' ? user.order : null}
                        className={classes.badge}
                        color="primary"
                      >
                        <div>{/* Nothing to see here */}</div>
                      </Badge>
                      <div>{user.name && user.name.split(' ')[0]}</div>
                    </div>
                  </GridListTile>
                );
              })}
            </GridList>
          </CardContent>
          <CardActions>
            <Fab
              className={classes.button}
              color="primary"
              variant="extended"
              onClick={() => handleSaveClick()}
            >
              {t('users.save')}
            </Fab>
          </CardActions>
        </Card>
      </div>
    </div>
  );
};

export default Users;
