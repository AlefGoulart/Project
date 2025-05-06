const createUserToken = require("../helpers/create-user-token");
const getToken = require("../helpers/get-token");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = class UserController {
  static async register(req, res) {
    const { name, email, password, confirmpassword } = req.body;

    if (!name) {
      return res.status(422).json({ message: "O nome é obrigatório" });
    }

    if (!email) {
      return res.status(422).json({ message: "O e-mail é obrigatório" });
    }

    if (!password) {
      return res.status(422).json({ message: "A senha é obrigatório" });
    }

    if (!confirmpassword) {
      return res
        .status(422)
        .json({ message: "A confirmação da senha é obrigatório" });
    }

    if (password !== confirmpassword) {
      return res.status(422).json({ message: "As senhas não coincidem!" });
    }

    const userExists = await User.findOne({ email: email });

    if (userExists) {
      return res.status(422).json({ message: "E-mail já cadastrado" });
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: passwordHash,
    });

    try {
      const newUser = await user.save();

      await createUserToken(newUser, req, res);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;

    if (!email) {
      return res.status(422).json({ message: "O e-mail é obrigatório" });
    }

    if (!password) {
      return res.status(422).json({ message: "A senha é obrigatória" });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(422)
        .json({ message: "Não há usuário com este e-mail" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(422).json({ message: "Senha inválida" });
    }

    await createUserToken(user, req, res);
  }

  static async checkUser(req, res) {
    let currentUser;

    console.log(req.headers.authorization);

    if (req.headers.authorization) {
      const token = getToken(req);
      const decoded = jwt.verify(token, "nossosecret");

      currentUser = await User.findById(decoded.id);

      currentUser.password = undefined;
    } else {
      currentUser = null;
    }
    res.status(200).send(currentUser);
  }

  static async getUserById(req, res) {
    const id = req.params.id;

    const user = await User.findById(id).select("-password");

    if (!user) {
      res.status(422).json({ message: "Usuário não encontrado" });
      return;
    }

    res.status(200).json({ user });
  }

  static async editUser(req, res) {

    const id = req.params.id;
    
    const { name, email, password, confirmpassword } = req.body;

    if (!name) {
      return res.status(422).json({ message: "O nome é obrigatório" });
    }

    user.name = name

    if (!email) {
      return res.status(422).json({ message: "O e-mail é obrigatório" });
    }

    const userExists = await User.findOne({ email: email });

    if (user.email !== email && userExists) {
      res.status(422).json({ message: "E-mail já cadastrado no sistema" });
      return;
    }

    user.email = email

    if (!password) {
      return res.status(422).json({ message: "A senha é obrigatório" });
    }

    if (!confirmpassword) {
      return res
        .status(422)
        .json({ message: "A confirmação da senha é obrigatório" });
    }
  }
};
