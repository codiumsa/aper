import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'typeface-montserrat-alternates';
import { Authenticator } from './components/Authenticator';
import Login from './components/Login';
import Home from './components/Home';
import Users from './components/Users';
import { CustomThemeProvider } from './theme';
import './utils/i18n';

function App() {
  return (
    <Router>
      <CustomThemeProvider>
        <CssBaseline />
        <Authenticator>
          <Route path={'/login'} component={Login} />
          <Route path={'/home'} component={Home} />
          <Route path={'/users'} component={Users} />
        </Authenticator>
      </CustomThemeProvider>
    </Router>
  );
}

export default App;
