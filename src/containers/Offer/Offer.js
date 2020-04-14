import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import 'moment/locale/fr';
import "./Offer.css";

const Offer = ({ user }) => {
  moment.locale('fr');
  const history = useHistory();

  const { id } = useParams();

  const [product, setProduct] = useState({});
  const [retailCount, setRetailCount] = useState();
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(process.env.REACT_APP_URL + `offer/${id}`);
      setRetailCount(response.data.count);
      setProduct(response.data.offer);
      setIsLoading(false)
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
                {/* <img className="offer-img" src={product.pictures[0]} alt={product.title} /> */}
                {product.picture ? <img className="offer-img" src={product.picture} alt={product.title} /> : product.picture}
                <div className="offer-title-block d-flex flex-column sp-between">
                  <h2>{product.title}</h2>
                  <p className="price">{product.price}€</p>
                  <p>{moment(product
                    .created).format('LLLL')}</p>
                </div>
              </div>
              <div className="offer-description">
                <h3>Description</h3>
                <p>{product.description}</p>
              </div>
            </div>
            <aside className="wrapper-user">
              <div className='user d-flex flex-column align-items sp-around'>
                <h2>{product.creator.account.username}</h2>
                <p>{retailCount} Annonce(s) en ligne</p>
                <button className="orange-btn"
                  onClick={() => {
                    user === null ? history.push("/user/log_in") : history.push(`/payment/${id}`, { title: product.title, picture: product.picture, price: product.price, product: product });
                  }}>Acheter</button>
              </div>
            </aside>
          </div>
        </section>}
    </>
  );
}

export default Offer;