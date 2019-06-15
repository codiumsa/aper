import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

const AuthenticationContext = React.createContext();

const Authenticator = ({ children, history }) => {
  const userDataString = localStorage.getItem('userData');
  let userData = {};
  let loggedIn = false;
  if (userDataString) {
    userData = JSON.parse(userDataString);
    loggedIn = true;
  }

  const [authState, setAuthState] = useState({
    loggedIn,
    verified: true,
    userData
  });

  const loginUser = React.useCallback(ud => {
    localStorage.setItem('userData', JSON.stringify(ud));
    setAuthState({ loggedIn: true, verified: true, userData: ud });
  }, []);
  // TODO also delete localStorage data if we ever store something there
  const logoutUser = React.useCallback(() => {
    localStorage.removeItem('userData');
    setAuthState({ loggedIn: false, verified: true, userData: {} });
    history.push('/login');
  }, [history]);
  useEffect(() => {
    if (authState.verified && !authState.loggedIn) {
      history.push('/login');
    }
  }, [authState.verified, authState.loggedIn, history]);
  return (
    <AuthenticationContext.Provider
      value={{ authState, loginUser, logoutUser }}
    >
      {!authState.verified && <h1>Loading</h1>}
      {authState.verified && children}
    </AuthenticationContext.Provider>
  );
};
const AuthenticatorWithRouter = withRouter(Authenticator);
export { AuthenticatorWithRouter as Authenticator, AuthenticationContext };
