import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import moment from "moment";
import 'moment/locale/fr';
import "./Offer.css";

const Offer = ({ user }) => {
  moment.locale('fr');
  const history = useHistory();

  const { id } = useParams();
  // console.log(id);

  const [products, setProducts] = useState({});
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://leboncoin-4lexandrine.herokuapp.com/offer/${id}`);
      const data = await response.json();
      setProducts(data);
      setIsLoading(false)
      // console.log(data);
    }
    fetchData();

  }, [id])

  return (
    <>
      {isLoading ? <></> :
        <section>
          <div className="d-flex justify-center wrapper">
            <div>
              <div className="block-offer">
                {/* <img className="offer-img" src={products.pictures[0]} alt={products.title} /> */}
                {products.picture ? <img className="offer-img" src={products.picture} alt={products.title} /> : products.picture}
                <div className="offer-title-block d-flex flex-column sp-between">
                  <h2>{products.title}</h2>
                  <p className="price">{products.price}€</p>
                  <p>{moment(products
                    .created).format('LLLL')}</p>
                </div>
              </div>
              <div className="offer-description">
                <h3>Description</h3>
                <p>{products.description}</p>
              </div>
            </div>
            <aside className="wrapper-user">
              <div className='user d-flex flex-column align-items sp-around'>
                <h2>{products.creator.account.username}</h2>
                <p>17 Annonces en ligne</p>
                <button className="orange-btn"
                  onClick={() => {
                    console.log(user);

                    user === null ? history.push("/user/log_in") : history.push("/payment", { title: products.title, picture: products.picture, price: products.price });
                  }}>Acheter</button>
              </div>
            </aside>
          </div>
        </section>}
    </>
  );
}

export default Offer;