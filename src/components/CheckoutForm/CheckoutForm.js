import React, { useState } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";

import axios from "axios";

const CheckoutForm = ({ stripe, price, title, username }) => {

    const [purchaseComplete, setPurchaseComplete] = useState(false);

    return (
        !purchaseComplete ? (
            <div className="d-flex flex-column align-items">
                {/* J'affiche mon formulmaire de CB */}
                <CardElement className="card" />
                {/* On envoie le numero de CB à Stripe, à aucun moment nous ne gérons la confidentialité ou la sécurité, c'est Stripe qui gère ! */}
                <button className="orange-btn" onClick={async () => {
                    const stripeResponse = await stripe.createToken({ name: username });

                    if (stripeResponse.error) {
                        alert(stripeResponse.error.message);
                    } else {
                        const response = await axios.post(`https://leboncoin-4lexandrine.herokuapp.com/payment`,
                            {
                                token: stripeResponse.token.id,
                                price: price,
                                title: title
                            }
                        );
                        if (response.status === 200) {
                            setPurchaseComplete(true);
                        } else {
                            alert("An error occurred");
                        }
                    }
                }}>Valider</button>
            </div >
        ) : (
                <div>
                    <h2>Paiement validé</h2>
                </div>
            )
    );
}

export default injectStripe(CheckoutForm);