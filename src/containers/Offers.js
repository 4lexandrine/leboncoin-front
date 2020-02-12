import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Offer from "./Offer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Offers = () => {

    const [products, setProducts] = useState({});
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("https://leboncoin-api.herokuapp.com/api/offer/with-count");
            const data = await response.json();
            setProducts(data.offers);
            setIsLoading(false);
        }
        fetchData();
    }, [])



    return (
        <>
            {isLoading ? <p>Loading...</p> :
                <div className="body-wrapper" >

                    <div className="search-block">
                        <input className="search-block-input" type="search" placeholder="Que recherchez-vous ?" />
                        <button className="search-block-btn">Rechercher</button>
                    </div>

                    {products.map(product => {
                        return (

                            <div className="offers-wrapper" key={product._id}>
                                {/* <div className="ellipse"></div> */}

                                <div className="picture"> {product.pictures[0] ? <img className="picture" src={product.pictures} alt={product.description} /> : product.pictures}</div>

                                <div className="offer-description">
                                    <FontAwesomeIcon className="icon-s icon-heart" icon={['far', 'heart']} />
                                    <div>
                                        <h2>{product.title}</h2>
                                        <p className="price">{product.price} €</p>
                                    </div>
                                    <p className="date">{product.created}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            }
        </>
    );
}

export default Offers;