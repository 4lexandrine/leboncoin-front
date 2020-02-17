import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./Offers.css";
import Search from "../../components/Search/Search";
import Pagination from "../../components/Pagination/Pagination";
import moment from "moment";
import 'moment/locale/fr';

const Offers = () => {
    moment.locale('fr');
    const [isLoading, setIsLoading] = useState(true); // état pour voir voir si la page est chargée ou en cours de chargement
    const [products, setProducts] = useState({}); // état pour mettre à jour la liste d'offres
    const [currentPage, setCurrentPage] = useState(1);
    const [totalOffers, setTotalOffers] = useState(0);
    const [limitOffersPerPage, setLimitOffersPerPage] = useState(5)

    useEffect(() => { // permet de déclencher une fonction uniquement au chargement de la page
        const fetchData = async () => { // fonction asynchrone (//axios) on demande au serveur de nous renvoyer les données
            const response = await fetch(`https://leboncoin-4lexandrine.herokuapp.com/offer/with-count`);
            const data = await response.json();
            setProducts(data.offers); // on enregistre les données reçues dans notre état products
            setTotalOffers(data.offers.length);
            console.log(data.offers.length);

            setIsLoading(false); // on signifie que le chargement est effectué
        }
        fetchData(); // on appelle la fonction
    }, [])

    return (
        <>
            {isLoading ? <>En cours de chargement...</> : // si le chargement est en cours sinon on affiche toutes les offres
                <section>
                    <div className="wrapper d-flex flex-column align-items sp-between" >
                        <div className="ellipse"></div>
                        <Search />
                        <Pagination limitOffersPerPage={limitOffersPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} totalOffers={totalOffers} />
                        {(products &&
                            products.map(product => { // on boucle dans nos offres pour les afficher toutes
                                // console.log(products);

                                const url = `/offer/${product._id}` // construction de l'url pour avoir une page qui présente les articles un par un
                                return (
                                    <Link key={product._id} to={url}>
                                        {/* Quand on clic sur une des offres on atterira sur le lien le l'offre en question ciblé grace à son id */}
                                        <div className="d-flex wrapper offers-wrapper" >
                                            {/* {console.log(product)} */}
                                            <div className="picture"> {product.picture ? <img className="picture" src={product.picture} alt={product.title} /> : product.picture}</div>
                                            <div className="offers-description d-flex flex-column sp-between">
                                                <FontAwesomeIcon className="icon-s icon-heart" icon={['far', 'heart']} />
                                                <div>
                                                    <h2>{product.title}</h2>
                                                    <p className="price">{product.price} €</p>
                                                </div>
                                                {/* Le package moment permet de transformer un objet Date en date "mercredi 13 janvier 2020 20h30" */}
                                                <p className="date">{moment(product.created).format('LLLL')}</p>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })
                        )}


                    </div>
                </section>
            }
        </>
    );
}

export default Offers;