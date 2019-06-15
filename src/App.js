import React from 'react';
import Favicon from 'react-favicon';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'typeface-montserrat-alternates';
import { Authenticator } from './components/Authenticator';
import Login from './components/Login';
import Home from './components/Home';
import { CustomThemeProvider } from './theme';
import './utils/i18n';

function App() {
  return (
    <Router>
      <Favicon url="favicon.png" />
      <CustomThemeProvider>
        <CssBaseline />
        <Authenticator>
          <Route path={'/login'} component={Login} />
          <Route path={'/home'} component={Home} />
        </Authenticator>
      </CustomThemeProvider>
    </Router>
  );
}

export default App;
