const FavoriteList = require("../models/FavoriteList");

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
    });

    try {

      const existList = await FavoriteList.findOne({ user: user._id });

      // verifica se existe lista para usuário e salva
      if (!existList) {

        const newFavoriteList = await favoriteList.save();
        res.status(201).json({ message: "Lista cadastrada com sucesso!", newFavoriteList });

      } else {

        return res.status(422).json({ message: "Usuário já possui lista cadastrada" });

      }
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  // retorna a lita dos usuários
  static async getList (req, res) {

    const favoriteList = await FavoriteList.find()

    res.status(200).json({
        favoriteList: favoriteList,
    })

  }
};
