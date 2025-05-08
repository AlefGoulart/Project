import api from "../../../utils/api";

import React, { useEffect, useState } from "react";
import styles from "./FavoriteProducts.module.css";
import { Link } from "react-router-dom";

import useFlashMessage from "../../../hooks/useFlashMessage";

function FavoriteProducts() {
  const [favoriteList, setFavoriteList] = useState({ products: [] });
  const [error, setError] = useState("");
  const { setFlashMessage } = useFlashMessage();

  const token = localStorage.getItem("token");

  // Verifica se o produto está na lista de favoritos
  const isProductFavorited = (productId) => {
    return favoriteList.products.some((product) => product.id === productId);
  };

  // Função para desfavoritar produto
  async function handleUnfavorite(productId) {
    let msgText = "Produto desfavoritado com sucesso!";
    let msgType = "success";

    if (!token) return;

    try {
      await api.delete(`/favoriteProducts/remove/${productId}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });

      setFavoriteList((prevList) => ({
        ...prevList,
        products: prevList.products.filter(
          (product) => product.id !== productId
        ),
      }));

      setFlashMessage(msgText, msgType);
    } catch (error) {
      msgText =
        error.response?.data?.message || "Erro ao desfavoritar o produto.";
      msgType = "error";
      setFlashMessage(msgText, msgType);
    }
  }

  useEffect(() => {
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
  }, [token]);

  if (error) return <p>{error}</p>;

  return (
    <section>
      <div className={styles.favoritelist_header}>
        <h1>Minha Lista de Produtos Favoritos</h1>
        <Link to="/favoriteProducts/favoriteLists">Voltar</Link>
      </div>
      <div className={styles.container}>
        {favoriteList.products.length === 0 ? (
          <p>Você ainda não favoritou nenhum produto.</p>
        ) : (
          favoriteList.products.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <h3 className={styles.productTitle}>{product.title}</h3>
              <img
                src={product.image}
                alt={product.title}
                className={styles.productImage}
              />
              <p className={styles.productPrice}>R${product.price}</p>
              <button
                className={`${styles.favoriteButton} ${styles.unfavorite}`}
                onClick={() => handleUnfavorite(product.id)}
              >
                Desfavoritar
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default FavoriteProducts;
