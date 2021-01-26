const mongoose = require('mongoose')
require('./database');
mongoose.connect('mongodb://localhost/simplejwt',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('Database is conected'))