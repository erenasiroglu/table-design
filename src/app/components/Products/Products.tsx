import React from "react";
import "./styles.css";

const productsData = [
  { id: 1, name: "Ürün 1", price: 100, image: "ürün1.jpg" },
  { id: 2, name: "Ürün 2", price: 150, image: "ürün2.jpg" },
  { id: 3, name: "Ürün 3", price: 200, image: "ürün3.jpg" },
  { id: 4, name: "Ürün 4", price: 120, image: "ürün4.jpg" },
  { id: 5, name: "Ürün 5", price: 180, image: "ürün5.jpg" },
  { id: 6, name: "Ürün 6", price: 220, image: "ürün6.jpg" },
];

export const Products: React.FC = () => {
  return (
    <div className="products-container">
      <div className="products-grid">
        {productsData.map((product) => (
          <div key={product.id} className="product-item">
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <a href={`/product/${product.id}`}>Detaylar</a>
          </div>
        ))}
      </div>
    </div>
  );
};
