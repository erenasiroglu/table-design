"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import styles from "./Products.module.css";

interface Product {
  id: number;
  title: string;
  subtitle: string;
  image: string;
}

export const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div className={styles.products}>
      <h2>Products</h2>
      {products.length > 0 ? (
        <div className={styles.productList}>
          {products.map((product) => (
            <div key={product.id} className={styles.productItem}>
              <Image
                src={product.image}
                alt={product.title}
                width={200}
                height={200}
                className={styles.productImage}
              />
              <h3 className={styles.productTitle}>{product.title}</h3>
              <p className={styles.productSubtitle}>{product.subtitle}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading products...</p>
      )}
    </div>
  );
};
