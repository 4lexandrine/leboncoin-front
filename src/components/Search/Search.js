// Composant de recherche dans le header
import React from "react";
import axios from "axios";
import "./Search.css";


const Search = ({ setSearchResults, search, setSearch }) => {


    return (
        <form className="search-block d-flex align-items justify-center"
            onSubmit={async (event) => {
                event.preventDefault();
                const response = await axios.post("https://leboncoin-4lexandrine.herokuapp.com/search", { search });
                setSearchResults(response.data.search)
            }}
        >
            <input
                className="search-block-input"
                type="search"
                placeholder="Que recherchez-vous ?"
                onChange={(event) => {
                    setSearch(event.target.value);
                }}
            />
            <button className="search-block-btn">Rechercher</button>
        </form>
    )
}

export default Search;

