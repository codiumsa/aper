import React, { useContext } from 'react';
import { AuthenticationContext } from './Authenticator';

const Home = () => {
  const context = useContext(AuthenticationContext);
  console.log(context);
  return <h1>Welcome to main app!</h1>;
};

export default Home;
