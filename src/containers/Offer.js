import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Offer = props => {
  const { id } = useParams();
  console.log(id);

  const [products, setProducts] = useState({});


  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://leboncoin-api.herokuapp.com/api/offer/${id}`);
      const data = await response.json();
      setProducts(data);
      console.log(data);

    }
    fetchData();

  }, [])

  return (
    <div className="body-wrapper">
      <div className="block-offer">
        <div>
          <img className="offer-img" src={products.pictures} alt={products.description} />
        </div>
        <div className="offer-title-block">
          <div>
            <h2>{products.title}</h2>
            <p className="price">{products.price}€</p>
          </div>
          <p>{products.created}</p>
          {/* {console.log(products.created) */}


          {/* {products.created.substring(0, products.created.length() - 1).toLocaleString()} */}
        </div>
      </div>
      <div className="offer-description">
        <h3>Description</h3>
        <p>{products.description}</p>

      </div>
    </div>
  );
}

export default Offer;