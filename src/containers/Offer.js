import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Offer = props => {
  const { id } = useParams();
  console.log(id);

  const [products, setProducts] = useState({});
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://leboncoin-api.herokuapp.com/api/offer/${id}`);
      const data = await response.json();
      setProducts(data);
      setIsLoading(false)
      // console.log(data);

    }
    fetchData();

  }, [id])

  return (
    <>
      {isLoading ? <p>Loading...</p> :
        <div className="body-wrapper">
          <div className="block-offer">
            <div>
              <img className="offer-img" src={products.pictures[0]} alt={products.title} />
            </div>
            <div className="offer-title-block">
              <div>
                <h2>{products.title}</h2>
                <p className="price">{products.price}€</p>
              </div>
              <p>{products.created}</p>
            </div>
          </div>
          <div className="offer-description">
            <h3>Description</h3>
            <p>{products.description}</p>

          </div>
        </div>}
        <div></div>
    </>
  );
}

export default Offer;