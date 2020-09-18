import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { Elements } from "react-stripe-elements";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import "./Payment.css"
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';


const Payment = ({ username }) => {
    const location = useLocation();
    const { title, picture, price } = location.state;
    const { id } = useParams();

    return (
        <GoogleReCaptchaProvider
            reCaptchaKey="6LcPv80ZAAAAABIdojmtX5td4-JGbvnrSWaDIoux"
        >
            <section>
                <div className="wrapper d-flex justify-center">
                    <div className="basket d-flex flex-column align-items">
                        <h2>Acheter en ligne</h2>
                        <img className="thumb" src={picture} alt={title} />
                        <h2>{title}</h2>
                        <p className="price">{price} €</p>
                        <h3>Vos coordonnées bancaires</h3>
                        <Elements>
                            <CheckoutForm price={price} title={title} username={username} id={id} />
                        </Elements>
                    </div>
                </div>
            </section>
        </GoogleReCaptchaProvider>

    );
}

export default Payment;