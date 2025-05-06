const mongoose = require('mongoose')

async function main() {
    await mongoose.connect('mongodb://localhost:27017/favoriteProducts')
    console.log('Conexão ao banco realizada!')
}

main().catch((err) => console.log(err))

module.exports = mongoose