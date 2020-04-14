import React, { useState, useEffect } from "react";

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
            const response = await axios.get(process.env.REACT_APP_URL + `offer/with-count?page=${currentPage}`);
            setTotal(response.count);
            setProducts(response.offers);
            setIsLoading(false);
        }
        fetchData();
    }, [currentPage]);

    return (
        <>
            {isLoading ? <>En cours de chargement...</> :
                <section>
                    <div className="wrapper d-flex flex-column align-items sp-between" >
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
        </>
    );
}

export default Offers;