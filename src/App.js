import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { StripeProvider } from "react-stripe-elements";
import Cookies from "js-cookie";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import Offers from "./containers/Offers/Offers";
import Payment from "./containers/Payment/Payment"
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
  // const tokenFromCookie = Cookies.get("token"); // on recupère le token 

  // let newState;
  // // Si le token existe
  // if (tokenFromCookie) {
  //   // on l'attribut comme nouvel état de user
  //   newState = { token: tokenFromCookie };
  // } else {
  //   // sinon on le réinitialise à null
  //   newState = null;
  // }
  //peut être écrit de cette manière là 

  const [user, setUser] = useState(Cookies.get("token") || null);
  const [username, setUsername] = useState(Cookies.get("username") || "");

  const onLog = (token, username) => {
    setUser(token);
    setUsername(username);
    Cookies.set("token", token, { expires: 7 });
    Cookies.set("username", username, { expires: 7 });
  };

  return (
    <StripeProvider apiKey="pk_test_PyYOjGwyrTCkcSWUiDUU5MlT00xdLDWfPF">
      <Router>
        <Header setUser={setUser} user={user} username={username} />
        <Switch>
          <Route exact path="/" >
            <Offers user={user} />
          </Route>
          <Route path="/payment">
            <Payment username={username} />
          </Route>
          <Route path="/offer/publish">
            <Publish />
          </Route>
          <Route path="/user/log_in" >
            <LogIn onLog={onLog} />
          </Route>
          <Route path="/user/sign_up">
            <SignUp onLog={onLog} />
          </Route>
          <Route path="/offer/:id">
            <Offer user={user} />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </StripeProvider>
  );
}

export default App;
