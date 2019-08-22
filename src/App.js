import React from 'react';
import Favicon from 'react-favicon';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import 'typeface-montserrat-alternates';
import { Authenticator } from './components/Authenticator';
import Login from './components/Login';
import Home from './components/Home';
import UsersOrder from './components/UsersOrder';
import { CustomThemeProvider } from './theme';
import './utils/i18n';
import { SnackbarProvider } from './components/Snackbar.context';
import UsersRoles from './components/UsersRoles';

function App() {
  return (
    <Router>
      <Favicon url="favicon.png" />
      <CustomThemeProvider>
        <CssBaseline />
        <SnackbarProvider>
          <Authenticator>
            <Route path={'/login'} component={Login} />
            <Route path={'/home'} component={Home} />
            <Route path={'/users_order'} component={UsersOrder} />
            <Route path={'/users_roles'} component={UsersRoles} />
            <Route exact path="/" render={() => <Redirect to="/home" />} />
          </Authenticator>
        </SnackbarProvider>
      </CustomThemeProvider>
    </Router>
  );
}

export default App;
