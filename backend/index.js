const express = require('express')
const cors = require('cors')

const app = express()

// config do JSON Response
app.use(express.json())

// Solve Cors
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))

// Pasta publica para imagens
app.use(express.static('public'))

// Rotas
const UserRoutes = require('./routes/UserRoutes')
const FavoritListeRoutes = require('./routes/FavoriteListRoutes')
const FavoriteProductRoutes = require('./routes/FavoriteProductRoutes')

app.use('/users', UserRoutes)
app.use('/favoriteLists', FavoritListeRoutes)
app.use('/favoriteProducts', FavoriteProductRoutes)

app.listen(5000)