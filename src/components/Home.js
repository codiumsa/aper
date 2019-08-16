import React, { useContext } from 'react';

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
import { AuthenticationContext } from './Authenticator';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    display: 'flex',
    flex: '1',
    flexDirection: 'column',
    minHeight: '100vh',
    background: '#508991'
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
    color: theme.palette.secondary.main,
    fontSize: 24
  },
  warning: {
    marginTop: theme.spacing()
  },
  lastTimeUsed: {
    marginTop: theme.spacing(4),
    fontSize: '14px'
  },
  notUsingButton: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4)
  },
  controlSVG: {
    width: 300,
    height: 300,
    marginTop: theme.spacing()
  }
}));

const opengate = () => {
  const fetchData = async () => {
    const result = await axios('open_gate');
    console.log(result.data);
  };
  fetchData();
};

const Home = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  //const [reverse, setReverse] = React.useState(false);

  return (
    <div className={classes.mainContainer}>
      <Toolbar />
      <div className={classes.cardContainer}>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <div className={classes.elementsContainer}>
              <div className={classes.toggleContainer}>
                {/* <Spring

  const { authState } = useContext(AuthenticationContext);

  const [reverse, setReverse] = React.useState(false);
  console.log(authState);
  return (
    authState.userData && (
      <div className={classes.mainContainer}>
        <Toolbar />
        <div className={classes.cardContainer}>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <div className={classes.elementsContainer}>
                <div className={classes.toggleContainer}>
                  {/* <Spring

                  reset
                  reverse={reverse}
                  from={{ number: 300 }}
                  to={{ number: 250 }}
                >
                  {props => (
                    <div
                      style={{ width: props.number, height: props.number }}
                      className={classes.toggleButton}
                      onClick={() => axios.get('open_gate')}
                      onMouseLeave={() => setReverse(prev => !prev)}
                      onMouseEnter={() => setReverse(prev => !prev)}
                    />
                  )}
                </Spring> */}

                <ControlSVG
                  className={classes.controlSVG}
                  onButtonClick={opengate}
                />
              </div>
              <div className={classes.titleContainer}>
                <Typography variant="h6">{t('home.clickHere')}</Typography>
                <FontAwesomeIcon
                  className={classes.pointUpIcon}
                  icon={faLongArrowAltUp}
                />
              </div>
              <Typography className={classes.warning} variant="subtitle2">
                {t('home.subtitle')}
              </Typography>
              <Typography className={classes.lastTimeUsed} variant="caption">
                {t('home.lastUser')}
              </Typography>
              <Fab
                className={classes.notUsingButton}
                color="primary"
                variant="extended"
              >
                {t('home.notUsing')}
              </Fab>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
