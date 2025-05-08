import api from "../../../utils/api";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import styles from "./Dashboard.module.css";

/* hooks */
import useFlashMessage from "../../../hooks/useFlashMessage";

function FavoriteLists() {
  const [favoriteLists, setFavoriteList] = useState(null);
  const [token] = useState(localStorage.getItem("token") || "");
  const { setFlashMessage } = useFlashMessage();

  const [showModal, setShowModal] = useState(false);
  const [listToDelete, setListToDelete] = useState(null);

  useEffect(() => {
    api
      .get("/favoriteLists", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        console.log("Dados recebidos da API:", response.data);
        setFavoriteList(response.data.favoriteList || null);
      });
  }, [token]);

  async function removeFavoriteList(id) {
    let msgType = 'success'

    const data = await api.delete(`/favoriteLists/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      }
    }).then((response) => {
      setFavoriteList(null)
      return response.data
    }).catch((err) => {
      msgType = 'error'
      return err.response.data
    })
    setFlashMessage(data.message, msgType)
    setShowModal(false);
    setListToDelete(null);
  }

  const handleDeleteClick = (listId) => {
    setListToDelete(listId);
    setShowModal(true);
  };

  const cancelDelete = () => {
    setShowModal(false);
    setListToDelete(null);
  };

  return (
    <section>
      <div className={styles.favoritelist_header}>
        <h1>Minha Lista</h1>
        {favoriteLists ? (
          <p></p>
        ) : (
          <Link to="/favoriteProducts/add">Criar Lista</Link>
        )}
      </div>

      <div className={styles.favoritelist_container}>
        {favoriteLists ? (
          <div className={styles.favoritelist_row} key={favoriteLists._id}>
            <span className="bold">Titulo: </span>
            <span>{favoriteLists.title}</span>
            <span className="bold">Descrição: </span>
            <span>{favoriteLists.description}</span>
            <div className={styles.actions}>
              <Link to={`/favoriteProducts/edit/${favoriteLists._id}`}>
                Editar Lista
              </Link>
              <Link to={`/favoriteProducts/view/${favoriteLists._id}`}>
                Visualizar Produtos Favoritos
              </Link>
              <button onClick={() => handleDeleteClick(favoriteLists._id)}>
                Excluir Lista
              </button>
            </div>
          </div>
        ) : (
          <p>Não há lista cadastrada</p>
        )}
      </div>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <p>Tem certeza que deseja excluir esta lista? Os produtos favoritos serão tambem excluidos</p>
            <div className={styles.modalActions}>
              <button onClick={() => removeFavoriteList(listToDelete)} className={styles.confirmButton}>
                Confirmar
              </button>
              <button onClick={cancelDelete} className={styles.cancelButton}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default FavoriteLists;
