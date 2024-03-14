const mongoose = require('mongoose')

module.exports = mongoose.model('User',{
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true}
})
