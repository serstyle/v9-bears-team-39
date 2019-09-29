import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Note from './components/Note';
import HomePage from './views/HomePage/HomePage';
import RegistrationPage from './views/Registration/RegistrationPage';
import LoginPage from './views/Login/LoginPage';
import Dashboard from './views/Dashboard/Dashboard';
import ThemeContextProvider from './contexts/ThemeContext';
import AuthState from './contexts/auth/AuthState';
import AlertState from './contexts/alert/AlertState';
import WikiState from './contexts/wikis/WikiState';
import setAuthToken from './utils/setAuthToken';
import ProfilePage from './views/Profile/ProfilePage';
import NavBar from './components/Navbar';
import WikiEdit from './components/Wiki/WikiEdit';
import PrivateRoute from './Routing/PrivateRoute';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <AuthState>
      <AlertState>
        <WikiState>
          <ThemeContextProvider>
            <BrowserRouter>
              <NavBar />
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/note" component={Note} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/register-page" component={RegistrationPage} />
                <Route path="/login-page" component={LoginPage} />
                <PrivateRoute path="/new-wiki" component={WikiEdit} />
                <PrivateRoute path="/profile" component={ProfilePage} />
              </Switch>
            </BrowserRouter>
          </ThemeContextProvider>
        </WikiState>
      </AlertState>
    </AuthState>
  );
}

export default App;
