import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from '../utils/axios';

const AuthenticationContext = React.createContext();

const Authenticator = ({ children, history }) => {
  const userDataString = localStorage.getItem('userData');
  let userData = {};
  let loggedIn = false;
  let role = 'GUEST';
  if (userDataString) {
    userData = JSON.parse(userDataString);
    if (userData && userData.error) {
      userData = false;
      loggedIn = false;
      role = userData.profileObj.role;
    } else {
      loggedIn = true;
    }
  }
  //console.log(userDataString);

  const [authState, setAuthState] = useState({
    loggedIn,
    verified: true,
    userData,
    role
  });

  const loginUser = ud => {
    localStorage.setItem('userData', JSON.stringify(ud));

    const fetchData = async () => {
      try {
        axios.setUp();
        const result = await axios('current_user');
        localStorage.setItem('currentUser', JSON.stringify(result.data));
        let r = result.data.role;
        setAuthState({ loggedIn: true, verified: true, userData: ud, role: r });
        if (r === 'ADMIN' || r === 'USER') history.push('home');
        else history.push('guests');
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  };
  // TODO also delete localStorage data if we ever store something there

  const logoutUser = React.useCallback(() => {
    localStorage.removeItem('userData');
    localStorage.removeItem('currentUser');
    setAuthState({ loggedIn: false, verified: true, userData: {} });
    history.push('/login');
  }, [history]);

  useEffect(() => {
    if (authState.verified && !authState.loggedIn) {
      history.push('/login');
    }
  }, [authState.verified, authState.loggedIn, history, authState.role]);

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
