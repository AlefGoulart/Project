import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

function FavoriteLists() {
  const [favoriteLists, setFavoriteList] = useState([]);

  return (
    <section>
      <div>
        <h1>Minha Lista</h1>
        <Link to="/favoriteProducts/add">Criar Lista</Link>
      </div>
      <div>
        {favoriteLists.length > 0 && <p>Minha lista cadastrada</p>}
        {favoriteLists.length === 0 && <p>Não há lista cadastrada</p>}
      </div>
    </section>
  );
}

export default FavoriteLists;
