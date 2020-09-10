import React, { useState, useEffect } from "react";
// import { css } from "@emotion/core";
import BeatLoader from "react-spinners/BeatLoader";
import "./Offers.css";
import Search from "../../components/Search/Search";
import Pagination from 'rc-pagination';
import Product from "../../components/Product/Product";
import "../../../node_modules/rc-pagination/assets/index.css";
import axios from "axios";

const Offers = ({ isActive }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState({});
    const [total, setTotal] = useState();
    const [searchResults, setSearchResults] = useState({});
    const [search, setSearch] = useState("");

    let [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`https://leboncoin-4lexandrine.herokuapp.com/offer/with-count?page=${currentPage}`);
            setTotal(response.data.count);
            setProducts(response.data.offers);
            setIsLoading(false);
        }
        fetchData();
    }, [currentPage]);

    useEffect(() => {
        (!isActive || !search) && setSearchResults({})
        !isActive && setSearch('')
    }, [isActive, search])

    return (
        <div className="wrapper d-flex align-items justify-center">
            {isLoading ? <div className="loader d-flex align-items justify-center"><BeatLoader color={"#f56b2a"} size={50} /></div> :
                <section>
                    <div className="d-flex flex-column align-items sp-between" >
                        <div className="ellipse"></div>
                        {isActive ?
                            <Search setProducts={setProducts} search={search} setSearch={setSearch} setSearchResults={setSearchResults} />
                            : <div style={{ height: "100px" }}></div>}
                        {(isActive && search && searchResults.length > 0 ?
                            searchResults.map(searchResult => {
                                return <Product {...searchResult} key={searchResult._id} />
                            })
                            : products &&
                            products.map(product => {
                                // setSearchResultsNumber(products.length)
                                return <Product {...product} key={product._id} />
                            })
                        )}

                        <Pagination
                            className="pagination"
                            pageSize={5}
                            total={isActive ? products.length : total}
                            onChange={(currentPage) => {
                                setCurrentPage(currentPage)
                            }}
                            style={{ margin: '20px 10px 50px' }}
                        />
                    </div>
                </section>
            }
        </div>
    );
}

export default Offers;