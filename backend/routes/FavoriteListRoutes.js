const router = require('express').Router()

const FavoriteListController = require('../controllers/FavoriteListController')

//middlewares
const verifyToken = require('../helpers/verify-token')

router.post('/create', verifyToken, FavoriteListController.create)
router.get('/', verifyToken, FavoriteListController.getList)
router.delete('/:id', verifyToken, FavoriteListController.removeFavoriteListById)

module.exports = router