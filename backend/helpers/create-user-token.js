const jwt = require("jsonwebtoken")

const createUserToken = async (User, req, res) => {

    const token = jwt.sign({
       name: User.name,
       id: User._id 
    }, "nossosecret")

    res.status(200).json({
        message: "Você está autenticado",
        token: token,
        userId: User._id
    })

}

module.exports = createUserToken