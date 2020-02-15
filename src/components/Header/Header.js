import React from "react";
import logo from "../../assets/Leboncoin.Logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import "./Header.css"

const Header = ({ user, setUser }) => {

    const history = useHistory();

    return (
        <>
            <header>
                <div className="wrapper d-flex sp-between">
                    <div className="left-header d-flex sp-between">
                        {/* Quand je clic sur le logo, je reviens vers la page d'accueil */}
                        <h1><img className="logo" src={logo} alt="" onClick={() => {
                            history.push("/");
                        }} /></h1>
                        <button className="add-product"><FontAwesomeIcon className="icon-xs" icon={['far', 'plus-square']} />Déposer une annonce</button>
                        <div className="underline">
                            <button className="search-btn" onClick={() => {
                                history.push("/");
                            }}><FontAwesomeIcon className="icon-s icon-search" icon='search' />Rechercher</button>

                        </div>
                    </div>
                    {/* Si mon user est null (que personne n'est connecté) alors j'affiche un bouton pour se connecter qui me renvoie vers la page d'accueil */}
                    {user === null ? (
                        <button className="user-connect underline d-flex flex-column align-items" onClick={() => {
                            history.push("/user/log_in");
                        }}>
                            <FontAwesomeIcon className="icon-s" icon={['far', 'user']} />
                            <p>Se connecter</p>
                        </button>
                    ) : (
                            // sinon j'affiche un bouton pour me deconnecter
                            <button className="user-connect underline d-flex flex-column align-items"
                                onClick={() => {
                                    // j'efface mon token
                                    Cookies.remove("token");
                                    // je remets mon état user à null pour pouvoir réafficher un bouton pour se connecter
                                    setUser(null);
                                    // je renvoie l'utilisateur vers la page d'accueil
                                    history.push("/");
                                }}

                            > <FontAwesomeIcon className="icon-s" icon={['far', 'user']} />
                                <p>Se déconnecter</p>

                            </button>
                        )}
                </div>
            </header>
        </>
    );
}

export default Header;

