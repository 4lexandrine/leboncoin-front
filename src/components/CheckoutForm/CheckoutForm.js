import React, { useState } from "react";
import { CardElement } from "@stripe/react-stripe-js";
import { useStripe, useElements } from '@stripe/react-stripe-js';

import axios from "axios";

const CheckoutForm = ({ price, title, username }) => {
    const stripe = useStripe();
    const elements = useElements();

    const [purchaseComplete, setPurchaseComplete] = useState(false);
    const [captchaToken, setCaptchaToken] = useState(null)

    const handleLoaded = () => {
        window.grecaptcha.ready(() => {
            window.grecaptcha
                .execute('6LcPv80ZAAAAABIdojmtX5td4-JGbvnrSWaDIoux', { action: "payment" })
                .then((token) => {
                    setCaptchaToken(token);
                });
        });
    };
    React.useEffect(() => {
        const script = document.createElement("script");
        script.src = `https://www.google.com/recaptcha/api.js?render=6LcPv80ZAAAAABIdojmtX5td4-JGbvnrSWaDIoux`;
        script.addEventListener("load", handleLoaded);
        document.body.appendChild(script);
    }, []);

    const onSubmit = async () => {
        const cardElement = elements.getElement(CardElement);
        const stripeResponse = await stripe.createToken(cardElement, { name: username })

        if (stripeResponse.error) {
            alert(stripeResponse.error.message);
        }

        const response = await axios.post(`https://leboncoin-4lexandrine.herokuapp.com/payment`,
            {
                token: stripeResponse.token.id,
                price: price,
                title: title,
                captchaToken
            }
        )
        if (response.status !== 200) {
            alert("An error occurred");
        }
        setPurchaseComplete(true);


    }

    return (
        !purchaseComplete ? (
            <div className="d-flex flex-column align-items">
                <CardElement className="card" onChange={async () => {
                }} />
                <button className="orange-btn" onClick={onSubmit}>Valider</button>
                <div
                    className="g-recaptcha">
                </div>
            </div >
        ) : (
                <div>
                    <h2>Paiement validé</h2>
                </div>
            )
    );
}

export default CheckoutForm;