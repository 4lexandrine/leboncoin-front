import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import "./Payment.css"


const Payment = ({ username }) => {
    const location = useLocation();
    const { title, picture, price } = location.state;
    const { id } = useParams();

    const stripePromise = loadStripe('pk_test_PyYOjGwyrTCkcSWUiDUU5MlT00xdLDWfPF');

    return (
        <section>
            <div className="wrapper d-flex justify-center">
                <div className="basket d-flex flex-column align-items">
                    <h2>Acheter en ligne</h2>
                    <img className="thumb" src={picture} alt={title} />
                    <h2>{title}</h2>
                    <p className="price">{price} €</p>
                    <h3>Vos coordonnées bancaires</h3>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm price={price} title={title} username={username} id={id} />
                    </Elements>
                </div>
            </div>
        </section>

    );
}

export default Payment;