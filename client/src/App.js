import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Note from './components/Note';
import HomePage from './views/HomePage/HomePage';
import RegistrationPage from './views/Registration/RegistrationPage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/note" component={Note} />
        <Route path="/register-page" component={RegistrationPage} />
        <Route path="/login-page" component={Note} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
