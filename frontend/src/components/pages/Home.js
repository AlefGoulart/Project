import api from "../../utils/api";

import React, { useEffect, useState } from "react";
import styles from "../pages/Home.module.css";

import useFlashMessage from "../../hooks/useFlashMessage";

function Home() {
  const [products, setProducts] = useState([]);
  const [favoriteList, setFavoriteList] = useState({ products: [] });
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const { setFlashMessage } = useFlashMessage();

  const isProductFavorited = (productId) => {
    return favoriteList.products.some((product) => product.id === productId);
  };
  

  async function handleFavorite(product) {
    let msgText = "Produto favoritado com sucesso!";
    let msgType = "success";

    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const response = await api.post(
        "/favoriteProducts/add",
        {
          id: product.id,
          title: product.title,
          price: product.price,
          description: product.description,
          category: product.category,
          image: product.image,
        },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      );

      const addedProduct = response.data?.product || product;

      setFavoriteList((prevList) => ({
        ...prevList,
        products: [...prevList.products, addedProduct],
      }));

      setFlashMessage(msgText, msgType);
    
    } catch (error) {
      msgText = error.response?.data?.message || "Erro ao favoritar o produto.";
      msgType = "error";
      setFlashMessage(msgText, msgType);
    }
  }

  // Função para desfavoritar o produto
  async function handleUnfavorite(productId) {
    let msgText = "Produto desfavoritado com sucesso!";
    let msgType = "success";

    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      await api.delete(`/favoriteProducts/remove/${productId}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });

      // Atualizar a lista de favoritos removendo o produto
      setFavoriteList((prevList) => ({
        ...prevList,
        products: prevList.products.filter((product) => product.id !== productId),
      }));

      setFlashMessage(msgText, msgType);
    } catch (error) {
      msgText = error.response?.data?.message || "Erro ao desfavoritar o produto.";
      msgType = "error";
      setFlashMessage(msgText, msgType);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    fetch("http://localhost:5000/favoriteProducts/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Não foi possivel conectar a API Externa! Atualize a pagina");
        }
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((err) => setError(err.message));

      if (token) {
        api
          .get("/favoriteLists/", {
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          })
          .then((res) => {
            setFavoriteList(res.data.favoriteList || { products: [] });
          })
          .catch((err) => setError(err.message));
      }
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
            <button
            className={`${styles.favoriteButton} ${
              isProductFavorited(product.id) ? styles.unfavorite : styles.favorite
            }`}
            onClick={() =>
              isProductFavorited(product.id)
                ? handleUnfavorite(product.id)
                : handleFavorite(product)
            }
          >
            {isProductFavorited(product.id) ? "Desfavoritar" : "Favoritar"}
          </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default Home;
