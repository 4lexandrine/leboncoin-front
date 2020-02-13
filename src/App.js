import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Offers from "./containers/Offers";
import Offer from "./containers/Offer";
import Cookies from "js-cookie";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faPlusSquare, faHeart, faBell, faEye, faClock } from '@fortawesome/free-regular-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import LogIn from './containers/LogIn';
import SignUp from './containers/SignUp';

library.add(faUser, faPlusSquare, faSearch, faHeart, faBell, faEye, faClock);


// 1. Lister toutes les pages de l'application Web
// 2. Créer un composant par page
// 3. Créer des liens entre les pages

function App() {
  const tokenFromCookie = Cookies.get("token");

  let newState;
  if (tokenFromCookie) {
    newState = { token: tokenFromCookie };
  } else {
    newState = null;
  }

  const [user, setUser] = useState(newState);

  return (

    <Router>
      <Header user={user} setUser={setUser} />
      <Switch>
        <Route path="/user/log_in" >
          <LogIn setUser={setUser} />
        </Route>
        <Route path="/user/sign_up">
          <SignUp />
        </Route>
        <Route path="/offer/:id">
          <Offer />
        </Route>
        <Route path="/" >
          <Offers />
        </Route>
      </Switch>
    </Router>

  );
}

export default App;
