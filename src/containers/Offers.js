import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
            <div className="ellipse"></div>

            {isLoading ? <p>Loading...</p> :
                <div className="body-wrapper" >

                    <div className="search-block">
                        <input className="search-block-input" type="search" placeholder="Que recherchez-vous ?" />
                        <button className="search-block-btn">Rechercher</button>
                    </div>

                    {products.map(product => {
                        const url = `/offer/${product._id}`
                        return (
                            <Link  key={product._id} to={url}>
                                <div className="offers-wrapper" >
                                    <div className="picture"> {product.pictures[0] ? <img className="picture" src={product.pictures[0]} alt={product.title} /> : product.pictures}</div>
                                    <div className="offers-description">
                                        <FontAwesomeIcon className="icon-s icon-heart" icon={['far', 'heart']} />
                                        <div>
                                            <h2>{product.title}</h2>
                                            <p className="price">{product.price} €</p>
                                        </div>
                                        <p className="date">{product.created}</p>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            }
        </>
    );
}

export default Offers;