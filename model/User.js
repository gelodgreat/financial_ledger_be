const mongoose = require('mongoose')

const validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        min: [6, 'Password should be atleast 6 characters']
    },
    mobileNumber: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
}, {
    autoCreate: true,
    autoIndex: true
})

const Users = mongoose.model('User', UserSchema);

module.exports = Users