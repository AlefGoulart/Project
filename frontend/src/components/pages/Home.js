import React, { useEffect, useState } from "react";
import styles from "../pages/Home.module.css"

function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    fetch("http://localhost:5000/favoriteProducts/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erro ao buscar produtos");
        }
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div className={styles.container}>
      {products.map((product) => (
        <div key={product.id} className={styles.productCard}>
          <h3 className={styles.productTitle}>{product.title}</h3>
          <img
            src={product.image}
            alt={product.title}
            className={styles.productImage}
          />
          <p className={styles.productPrice}>R${product.price}</p>
          {isLoggedIn && (
            <button className={styles.favoriteButton}>Favoritar</button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Home;
