import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./Offers.css";
import Search from "../../components/Search/Search";
import moment from "moment";
import 'moment/locale/fr';

const Offers = () => {
    moment.locale('fr')
    const [isLoading, setIsLoading] = useState(true); // état pour voir voir si la page est chargée ou en cours de chargement
    const [products, setProducts] = useState({}); // état pour mettre à jour la liste d'offres

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
            {isLoading ? <></> :
                <section>
                    <div className="wrapper d-flex flex-column align-items sp-between" >
                        <div className="ellipse"></div>
                        <Search />

                        {products.map(product => {
                            const url = `/offer/${product._id}`
                            return (
                                <Link key={product._id} to={url}>
                                    <div className="d-flex wrapper offers-wrapper" >
                                        <div className="picture"> {product.pictures[0] ? <img className="picture" src={product.pictures[0]} alt={product.title} /> : product.pictures}</div>

                                        <div className="offers-description d-flex flex-column sp-between">
                                            <FontAwesomeIcon className="icon-s icon-heart" icon={['far', 'heart']} />
                                            <div>
                                                <h2>{product.title}</h2>
                                                <p className="price">{product.price} €</p>
                                            </div>
                                            <p className="date">{moment(product.created).format('LLLL')}</p>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </section>
            }
        </>
    );
}

export default Offers;