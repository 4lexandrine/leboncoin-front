import React, { useState } from "react";
import logo from "../assets/Leboncoin.Logo.png";
import Search from "./Search";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

const Header = ({ user, setUser }) => {
    const history = useHistory();



    return (
        <>
            <header>
                <div className="wrapper">
                    <div className="left-header">
                        <h1><img className="logo" src={logo} alt="" /></h1>
                        <button className="add-product"><FontAwesomeIcon className="icon-xs" icon={['far', 'plus-square']} />Déposer une annonce</button>
                        <Search />
                    </div>
                    {user === null ? (
                        <button className="user-connect" onClick={() => {
                            history.push("/user/log_in");
                        }}>
                            <FontAwesomeIcon className="icon-s" icon={['far', 'user']} />
                            Se connecter
                        </button>
                    ) : (
                            <button className="user-connect"
                                onClick={() => {
                                    // En se déconnectant :
                                    // 1. Suppression du cookie userToken
                                    Cookies.remove("token");

                                    // 2. Mettre l'état user à null
                                    setUser(null);

                                    // 3. Aller sur la page d'accueil
                                    history.push("/");
                                }}
                            > <FontAwesomeIcon className="icon-s" icon={['far', 'user']} />
                                Se déconnecter
                        </button>
                        )}
                </div>
            </header>
        </>
    );
}

export default Header;


// {user === null ? <Redirect to="/" /> : null}

