const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test')

const connection = mongoose.connection;

connection.on('connected', function(){
    console.log('connected to db')
})

module.exports = connection;