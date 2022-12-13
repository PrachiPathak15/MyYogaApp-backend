const mongoose = require('mongoose')
const url = "mongodb+srv://PrachiPathak15:ABC%40123@cluster0.a4ofrtg.mongodb.net/Yoga"
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    phone: Number,
    batch: String,
})

module.exports = mongoose.model('users', userSchema);