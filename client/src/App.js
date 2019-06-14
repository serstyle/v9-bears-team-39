import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Note from './components/Note';
import HomePage from './views/HomePage/HomePage';
import RegistrationPage from './views/Registration/RegistrationPage';
import LoginPage from './views/Login/LoginPage';
import Dashboard from './views/Dashboard/Dashboard';
import ThemeContextProvider from './contexts/ThemeContext';
import AuthState from './contexts/auth/AuthState';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AuthState>
      <ThemeContextProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/note" component={Note} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/register-page" component={RegistrationPage} />
            <Route path="/login-page" component={LoginPage} />
          </Switch>
        </BrowserRouter>
      </ThemeContextProvider>
    </AuthState>
  );
}

export default App;
