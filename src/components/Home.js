import React, { useContext, useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltUp } from '@fortawesome/free-solid-svg-icons/faLongArrowAltUp';
import { useTranslation } from 'react-i18next';
import axios from '../utils/axios';
import Toolbar from './Toolbar';
import ControlSVG from './ControlSVG';
import { SnackbarContext } from './Snackbar.context';
import { AuthenticationContext } from './Authenticator';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    display: 'flex',
    flex: '1',
    flexDirection: 'column',
    minHeight: '-webkit-fill-available',
    background: '#508991'
  },
  cardContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    margin: theme.spacing(),
    width: '90%',
    maxWidth: '960px',
    padding: '30px 95px',
    borderRadius: 10,
    [theme.breakpoints.down('md')]: {
      padding: '0px 65px 0px 48px'
    },
    [theme.breakpoints.down('sm')]: {
      padding: '0px 15px 0px 15px'
    }
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'row',
    padding: 0
  },
  elementsContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    marginTop: theme.spacing()
  },
  toggleContainer: {
    display: 'flex',
    // width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: theme.spacing(2)
  },
  toggleButton: {
    borderRadius: '50%',
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark
    }
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
    alignItems: 'center'
  },
  pointUpIcon: {
    marginLeft: theme.spacing(),
    marginRight: theme.spacing(),
    color: theme.palette.secondary.main,
    fontSize: 24
  },
  warning: {
    marginTop: theme.spacing()
  },
  lastTimeUsed: {
    marginTop: theme.spacing(2),
    fontSize: '10px'
  },
  notUsingButton: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  controlSVG: {
    width: 250,
    height: 250,
    marginTop: theme.spacing()
  }
}));

const opengate = snackBarContext => {
  const fetchData = async () => {
    try {
      const result = await axios('open_gate');
      if (result.data && snackBarContext)
        snackBarContext.openSnackbar(result.data, 'success');
    } catch (e) {
      if (e.request && e.request.response && snackBarContext)
        snackBarContext.openSnackbar(e.request.response, 'error');
    }
  };
  fetchData();
};

const updateLocalStorage = () => {
  const fetchData = async () => {
    try {
      const result = await axios('current_user');
      let currentUser = JSON.stringify(result.data);
      localStorage.setItem('currentUser', currentUser);
    } catch (e) {
      console.log(e);
    }
  };
  fetchData();
};

const Home = ({ history }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const snackBarContext = useContext(SnackbarContext);
  const { authState } = useContext(AuthenticationContext);

  const [isParking, setIsParking] = useState(true);

  const [lastUser, setLastUser] = useState('');
  const [lastDate, setLastDate] = useState('');

  function renderDate(date) {
    date = new Date(date);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (date.toLocaleDateString() === today.toLocaleDateString()) {
      setLastDate('hoy a las ' + date.toLocaleTimeString());
    } else if (date.toLocaleDateString() === yesterday.toLocaleDateString()) {
      setLastDate('ayer a las ' + date.toLocaleTimeString());
    } else
      setLastDate(
        'el ' +
          date.toLocaleDateString('es-ES', {
            weekday: 'long',
            day: 'numeric',
            month: 'long'
          }) +
          ' a las ' +
          date.toLocaleTimeString()
      );
  }

  useEffect(() => {
    const fetchAbsense = async () => {
      try {
        const result = await axios('absent');
        if (result.data === 'yes') setIsParking(false);
        if (result.data === 'no') setIsParking(true);
      } catch (e) {
        if (e.request.status && e.request.status === 401) {
          history.push('/login');
        } else if (e.request.status && e.request.status === 403) {
          history.push('/guests');
        }
      }
    };

    const fetchLast = async () => {
      try {
        const result = await axios('last_use');
        if (result.data) {
          setLastUser(result.data.name);
          renderDate(result.data.last_use);
        }
      } catch (e) {
        if (e.request.status && e.request.status === 401) {
          history.push('/login');
        } else if (e.request.status && e.request.status === 403) {
          history.push('/guests');
        }
      }
    };
    fetchAbsense();
    fetchLast();
  }, [history]);

  const handleClick = () => {
    setIsParking(!isParking);
    const fetchData = async () => {
      try {
        const result = await axios.post('not_using');
        if (result.data && snackBarContext) {
          updateLocalStorage();
          snackBarContext.openSnackbar(result.data, 'success');
          if (result.request.status === 201) {
            setIsParking(false);
          }
          if (result.request.status === 202) {
            setIsParking(true);
          }
        }
      } catch (e) {
        if (e.request && e.request.response && snackBarContext) {
          snackBarContext.openSnackbar(e.request.response, 'error');
          setIsParking(!isParking);
        }
      }
    };
    fetchData();
  };

  return (
    <div className={classes.mainContainer}>
      {authState.loggedIn && (
        <React.Fragment>
          <Toolbar history={history} />
          <div className={classes.cardContainer}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <div className={classes.elementsContainer}>
                  <div className={classes.toggleContainer}>
                    <ControlSVG
                      className={classes.controlSVG}
                      onButtonClick={() => opengate(snackBarContext)}
                    />
                  </div>
                  <div className={classes.titleContainer}>
                    <FontAwesomeIcon
                      className={classes.pointUpIcon}
                      icon={faLongArrowAltUp}
                    />
                    <Typography variant="h6">{t('home.clickHere')}</Typography>
                    <FontAwesomeIcon
                      className={classes.pointUpIcon}
                      icon={faLongArrowAltUp}
                    />
                  </div>
                  <Typography className={classes.warning} variant="subtitle2">
                    {t('home.subtitle')}
                  </Typography>
                  <Typography
                    className={classes.lastTimeUsed}
                    variant="caption"
                  >
                    {lastUser &&
                      t('home.lastUser') + ' ' + lastUser + ' ' + lastDate}
                  </Typography>

                  <Fab
                    className={classes.notUsingButton}
                    color={isParking ? 'primary' : 'secondary'}
                    variant="extended"
                    onClick={() => handleClick()}
                  >
                    {isParking ? t('home.notUsing') : t('home.using')}
                  </Fab>
                </div>
              </CardContent>
            </Card>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default Home;
