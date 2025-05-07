const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUserToken = require("../helpers/create-user-token");
const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");

module.exports = class UserController {
  static async register(req, res) {

    // recebe informações do body
    const { name, email, password, confirmpassword } = req.body;

    // validações 
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

    // valida se usuário existe
    const userExists = await User.findOne({ email: email });

    if (userExists) {
      return res.status(422).json({ message: "E-mail já cadastrado" });
    }

    // cria um password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // cria um novo usuário
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

  // realiza Login no sistema
  static async login(req, res) {

    // recebe informações do body
    const { email, password } = req.body;

    // validações Login
    if (!email) {
      return res.status(422).json({ message: "O e-mail é obrigatório" });
    }

    if (!password) {
      return res.status(422).json({ message: "A senha é obrigatória" });
    }

    // valida e-mail informado
    const user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(422)
        .json({ message: "Não há usuário com este e-mail" });
    }

    //verifica a senha informada
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(422).json({ message: "Senha inválida" });
    }

    await createUserToken(user, req, res);
  }

  // valida usuário logado com o token
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

  // Busca o usuário pelo id
  static async getUserById(req, res) {
    const id = req.params.id;

    const user = await User.findById(id).select("-password");

    if (!user) {
      res.status(422).json({ message: "Usuário não encontrado" });
      return;
    }

    res.status(200).json({ user });
  }

  // edição de conta do usuário
  static async editUser(req, res) {
    const id = req.params.id;

    const token = getToken(req);
    const user = await getUserByToken(token);

    const { name, email, password, confirmpassword } = req.body;

    // validação da edição
    if (!name) {
      return res.status(422).json({ message: "O nome é obrigatório" });
    }

    user.name = name;

    if (!email) {
      return res.status(422).json({ message: "O e-mail é obrigatório" });
    }

    const userExists = await User.findOne({ email: email });

    if (user.email !== email && userExists) {
      res.status(422).json({ message: "E-mail já cadastrado no sistema" });
      return;
    }

    user.email = email;

    //valida password para alteração
    if (password != confirmpassword) {
      res.status(422).json({ message: "As senhas não conferem" });
      return;
    }else if (password == confirmpassword && password != null) {
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        user.password = passwordHash
    }

    try {

        // realiza o update do usuário
        await User.findOneAndUpdate(
            {_id: user._id},
            {$set: user},
            {new: true}
        )

        res.status(200).json({message: 'Usuário atualizado com sucesso.'})
        
    } catch (error) {
        res.status(500).json({message: err})
        return
    }
  } 
};
