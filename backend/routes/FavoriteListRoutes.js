const router = require('express').Router()

const FavoriteListController = require('../controllers/FavoriteListController')

//middlewares
const verifyToken = require('../helpers/verify-token')

router.post('/create', verifyToken, FavoriteListController.create)
router.get('/', verifyToken, FavoriteListController.getList)

module.exports = router