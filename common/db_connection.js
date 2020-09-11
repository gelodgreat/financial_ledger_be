const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/templatedb', {
    useNewUrlParser: true,
    useCreateIndex: true,
}).then(success => {
    console.log('Connected to MongoDB Server')
});

module.exports = mongoose;