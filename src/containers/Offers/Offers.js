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

    return (
        <div className="wrapper d-flex align-items justify-center">
            {isLoading ? <div className="loader d-flex align-items justify-center"><BeatLoader color={"#f56b2a"} size={50} /></div> :
                <section>
                    <div className="d-flex flex-column align-items sp-between" >
                        <div className="ellipse"></div>
                        {isActive ?
                            <Search setProducts={setProducts} />
                            : <div style={{ height: "100px" }}></div>}
                        {(products &&
                            products.map(product => {
                                return <Product {...product} key={product._id} />
                            })
                        )}

                        <Pagination
                            className="pagination"
                            pageSize={5}
                            total={total}
                            onChange={(currentPage) => {
                                setCurrentPage(currentPage)
                            }}

                        />
                    </div>
                </section>
            }
        </div>
    );
}

export default Offers;