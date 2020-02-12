import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Search = () => {
    return (
        <div className="search-wrapper">
            <input className="search" type="search" placeholder="Rechercher"></input>
            <FontAwesomeIcon className="icon-xs icon-search" icon='search' />
        </div>)
}

export default Search;