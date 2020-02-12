import React from "react";
import logo from "../assets/Leboncoin.Logo.png";
import Search from "./Search";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const Header = () => {
    return (
        <>

            <header>
                <div className="wrapper">
                    <div className="left-header">
                        <h1><img className="logo" src={logo} alt="" /></h1>
                        <button className="add-product"><FontAwesomeIcon className="icon-xs" icon={['far', 'plus-square']} />Déposer une annonce</button>
                        <Search />
                    </div>
                    <div className="user-connect">
                        <FontAwesomeIcon className="icon-s" icon={['far', 'user']} />
                        <p>Se connecter</p>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;