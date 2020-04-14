import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from "moment";
import 'moment/locale/fr';

const Product = ({ _id, picture, title, price, created }) => {
    moment.locale('fr');

    const url = `/offer/${_id}`
    return <div className="offers">
        <Link to={url}>
            <div className="d-flex wrapper offers-wrapper" >
                <div className="picture"> {picture ? <img className="picture" src={picture} alt={title} /> : picture}</div>
                <div className="offers-description d-flex flex-column sp-between">
                    <FontAwesomeIcon className="icon-s icon-heart" icon={['far', 'heart']} />
                    <div>
                        <h2>{title}</h2>
                        <p className="price">{price} €</p>
                    </div>
                    <p className="date">{moment(created).format('LLLL')}</p>
                </div>
            </div>
        </Link>
    </div>;
}

export default Product;