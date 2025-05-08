import api from "../../../utils/api";

import { useState, useEffect } from "react";
import styles from "./EditFavoriteList.module.css";
import FavoriteListForm from "../../form/FavoriteListForm";
import { Link } from "react-router-dom";

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
      <div className={styles.editFavoriteList_header}>
        <h1>Editando a lista: {favoriteList.title}</h1>
        <Link to="/favoriteProducts/favoriteLists">Voltar</Link>
      </div>
      <div className={styles.container}>
      {favoriteList.title && (
        <FavoriteListForm handleSubmit={updateFavoriteList} btnText="Atualizar" favoriteListData={favoriteList}/>
      )}
      </div>
    </section>
  );
}

export default EditFavoriteList;
