const FavoriteList = require("../models/FavoriteList");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// helpers
const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");

module.exports = class FavoriteListController {
  //Criando a lista de favoritos
  static async create(req, res) {
    const { title, description } = req.body;

    // validações
    if (!title) {
      res.status(422).json({ message: "Titulo é obrigatório" });
      return;
    }

    if (!description) {
      res.status(422).json({ message: "Descrição é obrigatório" });
      return;
    }

    // usuário da list
    const token = getToken(req);
    const user = await getUserByToken(token);

    // create Favorite List
    const favoriteList = new FavoriteList({
      title,
      description,
      user: user._id,
      products: [],
    });

    try {
      const existList = await FavoriteList.findOne({ user: user._id });

      // verifica se existe lista para usuário e salva
      if (!existList) {
        const newFavoriteList = await favoriteList.save();
        res
          .status(201)
          .json({ message: "Lista cadastrada com sucesso!", newFavoriteList });
      } else {
        return res
          .status(422)
          .json({ message: "Usuário já possui lista cadastrada" });
      }
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  // retorna a lista dos usuários
  static async getList(req, res) {
    const token = getToken(req);
    const user = await getUserByToken(token);

    const favoriteList = await FavoriteList.findOne({ user: user._id });

    res.status(200).json({
      favoriteList: favoriteList,
    });
  }

  //remove a lista de favoritos com os itens favoritados
  static async removeFavoriteListById(req, res) {

    const id = req.params.id;

    //valida o id da lista a ser removida
    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: "ID Inválido" });
      return;
    }

    // verifica se existe lista pelo id
    const existList = await FavoriteList.findOne({ _id: id });

    if (!existList) {
        res.status(404).json({ message: "Lista não encontrada"});
    }

    //checar se o usuário logado é dono na lista
    const token = getToken(req);
    const user = await getUserByToken(token);

    if(existList.user._id.toString() !== user._id.toString()) {
        return res.status(422).json({ message: "Houve um problema ao processar a solicitação"});
    }

    await FavoriteList.findByIdAndDelete(id)

    res.status(200).json({message: "Lista removida com sucesso!"})

  }
};
