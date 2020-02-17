import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from "js-cookie";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Offers from "./containers/Offers/Offers";
import Offer from "./containers/Offer/Offer";
import LogIn from './containers/LogIn/LogIn';
import SignUp from './containers/SignUp/SignUp';
import Publish from './containers/Publish/Publish';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faPlusSquare, faHeart, faBell, faEye, faClock } from '@fortawesome/free-regular-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

library.add(faUser, faPlusSquare, faSearch, faHeart, faBell, faEye, faClock); // libraire fontawesome icones du site

// 1. Lister toutes les pages de l'application Web
// 2. Créer un composant par page
// 3. Créer des liens entre les pages

function App() {
  const tokenFromCookie = Cookies.get("token"); // on recupère le token 

  let newState;
  // Si le token existe
  if (tokenFromCookie) {
    // on l'attribut comme nouvel état de user
    newState = { token: tokenFromCookie };
  } else {
    // sinon on le réinitialise à null
    newState = null;
  }

  const [user, setUser] = useState(newState);

  return (
    <Router>
      <Header user={user} setUser={setUser} />
      <Switch>
        <Route path="/offer/publish">
          <Publish user={user} />
        </Route>
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
      {/* <Footer /> */}
    </Router>

  );
}

export default App;
