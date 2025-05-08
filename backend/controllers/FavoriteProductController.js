const axios = require("axios");
const FavoriteList = require("../models/FavoriteList");

//helpers
const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");

module.exports = class FavoriteProductController {
  // listar produtos da API
  static async listProducts(req, res) {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      res.status(200).json(response.data);
    } catch (err) {
      res.status(500).json({ message: "API externa fora do ar, atualize a pagina" });
    }
  }

  //adiciona produto na lista do usuário
  static async addProductToList(req, res) {
    const { id, title, price, description, category, image } = req.body;

    // validações
    if (!id) {
      res.status(422).json({ message: "Id é obrigatório" });
      return;
    }

    if (!title) {
      res.status(422).json({ message: "Titulo é obrigatório" });
      return;
    }

    if (!price) {
      res.status(422).json({ message: "Preço é obrigatório" });
      return;
    }

    if (!description) {
      res.status(422).json({ message: "Descrição é obrigatório" });
      return;
    }

    if (!category) {
      res.status(422).json({ message: "Categoria é obrigatório" });
      return;
    }

    // Retornar usuário
    const token = getToken(req);
    const user = await getUserByToken(token);

    //procura se há lista para o usuário
    const listUser = await FavoriteList.findOne({ user: user._id });

    if (!listUser) {
      return res.status(404).json({ message: "Lista não encontrada" });
    }

    // valida se o produto já foi adicionado
    const alreadyFavorited = listUser.products.some(product => product.id === Number(id));

    if (alreadyFavorited) {
      return res
        .status(409)
        .json({ message: "Produto já favoritado nesta lista." });
    }

    if (listUser.products.length >= 5) {
        return res
          .status(403)
          .json({ message: "Limite de 5 produtos favoritados atingido." });
      }

    //salva produto na lista de favoritos
    listUser.products.push({ id: Number(id), title, price, description, category, image });

    try {
      await listUser.save();
      return res
        .status(200)
        .json({ message: "Produto adicionado à lista", listUser });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao adicionar produto", error: error.message });
    }
  }

  static async removeProductFromList(req, res) {
    
    const token = getToken(req);
    const user = await getUserByToken(token);

    if (!user) return res.status(401).json({ message: 'Não autorizado' });
  
    const { id } = req.params;
  
    const list = await FavoriteList.findOne({ user: user._id });

    if (!list) {
      return res.status(404).json({ message: 'Lista não encontrada' });
    }
  
    // Verifica se o produto está na lista
    const productIndex = list.products.findIndex(product => product.id === Number(id));
  
    if (productIndex === -1) {
      return res.status(404).json({ message: 'Produto não encontrado na lista' });
    }
  
    // Remove o produto
    list.products.splice(productIndex, 1);
  
    try {
      await list.save();
      return res.status(200).json({ message: 'Produto removido com sucesso'});
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao remover produto'});
    }
  }

};
