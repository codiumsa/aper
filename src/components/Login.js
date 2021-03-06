import React, { useContext } from 'react';
import GoogleLogin from 'react-google-login';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons/faGoogle';
import { useSpring, animated } from 'react-spring';
import { AuthenticationContext } from './Authenticator';
import logo from '../assets/logo.jpeg';

const calc = (x, y) => [
  -(y - window.innerHeight / 2) / 20,
  (x - window.innerWidth / 2) / 20,
  1.1
];
const trans = (x, y, s) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

const useLogoStyles = makeStyles({
  media: { width: '80%' },
  mediaSm: { width: '197', height: '120px' }
});
const Logo = ({ preventAnimation }) => {
  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 5, tension: 350, friction: 40 }
  }));
  const classes = useLogoStyles();
  return (
    <React.Fragment>
      {!preventAnimation && (
        <animated.img
          className={classes.media}
          src={logo}
          onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
          onMouseLeave={() => set({ xys: [0, 0, 1] })}
          style={{ transform: props.xys.interpolate(trans) }}
        />
      )}
      {preventAnimation && (
        <img alt="" className={classes.mediaSm} src={logo} />
      )}
    </React.Fragment>
  );
};

const useStyles = makeStyles(theme => ({
  mainContainer: {
    display: 'flex',
    flex: '1',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#508991',
    minHeight: '100vh'
  },
  mainTitle: {
    marginBottom: theme.spacing(6),
    fontSize: 24,
    fontWeight: theme.typography.fontWeightLight
  },
  card: {
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
  leftContent: {
    display: 'flex',
    flex: 1,
    alignItems: 'center'
  },
  rightContent: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column'
  },
  media: { width: '80%' },
  input: {
    marginBottom: theme.spacing(2)
  },
  loginButton: {
    marginTop: theme.spacing(2)
  },
  loginWithTitle: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    color: theme.palette.grey[700]
  },
  loginWithContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  fontIcons: { fontSize: 28 },
  loginWithBaseStyle: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    width: '50px',
    height: '50px'
  },
  googleButton: {
    marginRight: theme.spacing(),
    color: theme.palette.getContrastText('#D44638'),
    backgroundColor: '#D44638',
    '&:hover': {
      backgroundColor: '#B23121'
    }
  },
  createAccount: {
    cursor: 'pointer',
    marginTop: theme.spacing(7),
    display: 'flex',
    justifyContent: 'center',
    color: theme.palette.grey[700],
    '&:hover': {
      color: theme.palette.primary.dark
    }
  },
  logoTop: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing(4)
  }
}));

const Login = ({ history }) => {
  const { t } = useTranslation();
  const [creatingAccount, setCreatingAccount] = React.useState(false);
  const { loginUser } = useContext(AuthenticationContext);
  // We make sure to logout user if this component is rendered
  const loginCallback = (data, success) => {
    console.log(data);
    loginUser(data);
    if (success) {
      history.push('home');
    }
  };
  const matchesMedia = useMediaQuery('(min-width:800px)');
  const classes = useStyles();
  return (
    <div className={classes.mainContainer}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          {matchesMedia && (
            <div className={classes.leftContent}>
              <Logo />
            </div>
          )}
          <div className={classes.rightContent}>
            {!matchesMedia && (
              <div className={classes.logoTop}>
                <Logo preventAnimation />
              </div>
            )}
            {matchesMedia && (
              <Typography
                className={classes.mainTitle}
                align="center"
                variant="h6"
              >
                {t('login.title')}
              </Typography>
            )}
            {creatingAccount && (
              <TextField
                className={classes.input}
                label={t('login.name')}
                variant="filled"
              />
            )}
            <TextField
              className={classes.input}
              label={t('login.email')}
              variant="filled"
            />
            <TextField
              className={classes.input}
              label={t('login.password')}
              type="password"
              variant="filled"
            />
            <Fab
              className={classes.loginButton}
              color="primary"
              variant="extended"
            >
              {creatingAccount ? t('login.createAccount') : t('login.login')}
            </Fab>

            {!creatingAccount && (
              <React.Fragment>
                <Typography
                  className={classes.loginWithTitle}
                  align="center"
                  variant="body2"
                >
                  {t('login.loginWithProvider')}
                </Typography>
                <div className={classes.loginWithContainer}>
                  <GoogleLogin
                    clientId={process.env.REACT_APP_GOOGLE_CID}
                    onSuccess={data => loginCallback(data, true)}
                    onFailure={data => loginCallback(data, false)}
                    render={renderProps => (
                      <div
                        className={`${classes.loginWithBaseStyle} ${classes.googleButton}`}
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                      >
                        <FontAwesomeIcon
                          className={classes.fontIcons}
                          icon={faGoogle}
                        />
                      </div>
                    )}
                  />
                </div>
              </React.Fragment>
            )}

            <Typography
              className={classes.createAccount}
              onClick={() => setCreatingAccount(prevState => !prevState)}
              align="center"
              variant="body2"
            >
              {creatingAccount
                ? t('login.loginWithAccount')
                : t('login.orCreateAccount')}
            </Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
