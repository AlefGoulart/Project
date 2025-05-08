import api from "../../../utils/api";

import { useState, useEffect } from "react";

import styles from "./AddFavoriteList.module.css";

import FavoriteListForm from "../../form/FavoriteListForm";

import FavoriteLists from "./FavoriteLists";

/* Pegar o ID da lista para buscar por ID*/
import { useParams, useNavigate } from 'react-router-dom'

/* hooks */
import useFlashMessage from "../../../hooks/useFlashMessage";


function EditFavoriteList() {
  const [favoriteList, setFavoriteList] = useState({});
  const [token] = useState(localStorage.getItem("token") || "");
  const { id } = useParams()
  const { setFlashMessage } = useFlashMessage();
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/favoriteLists/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        }
      })
      .then((response) => {
        setFavoriteList(response.data.favoriteList)
      })
  }, [token, id])

  async function updateFavoriteList(favoriteList) {

    let msgType = 'success'

    const formData = new FormData()

    await Object.keys(favoriteList).forEach((key) => {
        formData.append(key, favoriteList[key])
    })

    const data = await api.patch(`favoriteLists/${favoriteList._id}`, favoriteList, {
        headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
            'Content-Type': 'application/json',
        }
    }).then((response) => {
        return response.data
      })
      .catch((err) => {
        msgType = 'error'
        return err.response.data
      })

    setFlashMessage(data.message, msgType)

    navigate('/favoriteProducts/favoriteLists');

  }

  return (
    <section>
      <div className={styles.addListFavorite_header}>
        <h1>Editando a lista: {favoriteList.title}</h1>
        <p>Após edição os dados serão atualizados</p>
      </div>
      {favoriteList.title && (
        <FavoriteListForm handleSubmit={updateFavoriteList} btnText="Atualizar" favoriteListData={favoriteList}/>
      )}
    </section>
  );
}

export default EditFavoriteList;
