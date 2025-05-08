import api from "../../../utils/api";

import styles from "./AddFavoriteList.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

/* componentes */
import FavoriteListForm from "../../form/FavoriteListForm";

/* hooks */
import useFlashMessage from "../../../hooks/useFlashMessage";

function AddFavoriteList() {
  const [token] = useState(localStorage.getItem("token") || "");
  const { setFlashMessage } = useFlashMessage()
  const navigate = useNavigate()

  async function registerFavoriteList(favoriteList) {
    let msgType = 'success'

    const formData = new FormData()

    await Object.keys(favoriteList).forEach((key) =>
        formData.append(key, favoriteList[key]),
      )
    
      //chamada api para edição do user
          const data = await api
            .post('/favoriteLists/create/', favoriteList, {
              headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'application/json',
              },
            })
            .then((response) => {
              return response.data
            })
            .catch((err) => {
              msgType = 'error'
              return err.response.data
            })
      
          setFlashMessage(data.message, msgType)

          if(msgType !== 'error'){
            navigate('/favoriteProducts/favoriteLists')
          }
          
  }

  return (
    <section className={styles.addListFavorite_header}>
      <div>
        <h1>Criar lista de favoritos</h1>
      </div>
      <FavoriteListForm
        handleSubmit={registerFavoriteList}
        btnText="Criar lista"
      />
    </section>
  );
}

export default AddFavoriteList;
