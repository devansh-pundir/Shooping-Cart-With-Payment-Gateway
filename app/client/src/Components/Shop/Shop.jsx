import React, { useState, useEffect } from "react";
import Card from "../Shop/Card";

const BASE_URL = "http://localhost:8000";

const Products = () => {
  const [product, setProduct] = useState([]);

  const getProducts = async () => {
    let result = await fetch(`${BASE_URL}/products`);
    result = await result.json();
    console.log("🚀🚀 Fetched Data 🚀🚀", result);
    setProduct(result);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className="wrapper">
        <h1 className="shop-headline">Shopping Cart</h1>
        <div className="card-container">
          {product.map((item) => {
            return <Card key={item.id} {...item} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Products;
