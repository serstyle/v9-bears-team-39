import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Note from './components/Note';
import HomePage from './views/HomePage/HomePage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path to="/" component={HomePage} />
        <Route path to="/note" component={Note} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
