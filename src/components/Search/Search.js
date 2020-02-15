// Composant de recherche dans le header
import React from "react";
import "./Search.css";


const Search = () => {
    return (
        <div className="search-block d-flex align-items justify-center">
            <input className="search-block-input" type="search" placeholder="Que recherchez-vous ?" />
            <button className="search-block-btn">Rechercher</button>
        </div>
    )
}

export default Search;

