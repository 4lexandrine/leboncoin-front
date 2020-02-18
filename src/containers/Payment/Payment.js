import React from "react";
import { useLocation } from "react-router-dom";
import { Elements } from "react-stripe-elements";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import "./Payment.css"

const Payment = () => {
    const location = useLocation();
    const { title, picture, price, username } = location.state;
    return (
        <section>
            <div className="wrapper d-flex justify-center">
                <div className="basket d-flex flex-column align-items">
                    <h2>Acheter en ligne</h2>
                    <img className="thumb" src={picture} alt={title} />
                    <h2>{title}</h2>
                    <p className="price">{price} €</p>
                    <h3>Vos coordonnées bancaires</h3>
                    <Elements>
                        <CheckoutForm username={username} price={price} title={title} />
                    </Elements>
                </div>
            </div>
        </section>
    );
}

export default Payment;