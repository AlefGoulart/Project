import { useState } from "react";

import formStyles from "./Form.module.css";

import Input from "./Input";

function FavoriteListForm({ handleSubmit, favoriteListData, btnText }) {
  const [favoriteList, setFavoriteList] = useState(favoriteListData || {});

  function handleChange(e) {
    setFavoriteList({ ...favoriteList, [e.target.name]: e.target.value });
  }

  function submit(e){
    e.preventDefault()
    console.log(favoriteList)
    handleSubmit(favoriteList)
  }

  return (
    <form onSubmit={submit} className={formStyles.form_container}>
      <Input
        text="Titulo"
        type="text"
        name="title"
        placeholder="Digite o Titulo"
        handleOnChange={handleChange}
        value={favoriteList.title || ""}
      />
      <Input
        text="Descrição"
        type="text"
        name="description"
        placeholder="Digite uma descrição"
        handleOnChange={handleChange}
        value={favoriteList.description || ""}
      />
      <input type="submit" value={btnText} />
    </form>
  );
}

export default FavoriteListForm;
