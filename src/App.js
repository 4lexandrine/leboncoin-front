import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Offers from "./containers/Offers";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faPlusSquare, faHeart } from '@fortawesome/free-regular-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

library.add(faUser, faPlusSquare, faSearch, faHeart);


// 1. Lister toutes les pages de l'application Web
// 2. Créer un composant par page
// 3. Créer des liens entre les pages

function App() {
  return (
    <div>
      <Header />
      <Router>
        <Switch>
          <Route path="/" >
            <Offers />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
