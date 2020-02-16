import React from "react";
import { Link } from "react-router-dom";

const Pagination = ({ limitOffersPerPage, currentPage, setCurrentPage, totalOffers }) => {
    const pages = [];
    const url = `?page=${currentPage}&limit=${limitOffersPerPage}`

    for (let i = 1; i <= Math.ceil(totalOffers / limitOffersPerPage); i++) {
        pages.push(i);
    }

    return (
        <div>
            <ul className="pagination d-flex">
                {pages.map(page => {
                    return (
                        <Link to={url} key={page}>
                            <li>
                                <button className="pagination-btn" onClick={() => {
                                    setCurrentPage(page);
                                }}>
                                    {page}
                                </button>
                            </li>
                        </Link>
                    )
                })}
            </ul>
        </div>
    );
}

export default Pagination;