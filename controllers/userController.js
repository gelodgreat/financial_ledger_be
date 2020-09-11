User = require('../model/DataModels')['User'];
const bcrypt = require('bcryptjs');
const saltRounds = 10;

exports.getAll = async (req, res) => {

    User.find((err, users) => {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Contacts retrieved successfully",
            data: users
        });
    });
}

exports.getById = (req, res) => {
    const id = req.params.id;
    if (id) {
        User.findById(id, (err, users) => {
            if (err) {
                res.json({
                    status: "error",
                    message: err,
                });
            }
            res.json({
                status: "success",
                message: "Contacts retrieved successfully",
                data: users
            });
        });
    }
}

exports.authAccess = async (req, res) => {
    const data = req.body;
    const email = data['email'];
    const password = data['password']
    try {
        if (email && password) {
            var user = await User.findOne({
                email: email
            });

            if (user) {
                var isMatch = await bcrypt.compare(password, user.password);
                if (isMatch) {
                    res.json({
                        user: user,
                        status: 200
                    })
                } else {
                    res.json({
                        message: "Incorrect email or password.",
                        status: 200
                    })
                }

            } else {
                res.json({
                    message: "No user found.",
                    status: 200
                })
            }
        } else {
            res.json({
                message: "Incomplete field.",
                status: 200
            })
        }

    } catch (error) {
        console.log(error)
        res.json({
            message: error,
            status: 400
        })
    }

}

exports.addUser = async (req, res) => {
    var data = req.body;
    var password = await bcrypt.hash(data.password, saltRounds);
    data['password'] = password

    const users = new User(data);
    users.save().then((result) => {
        console.log(result)
        if (result['errors']) {
            res.json({
                status: "error",
                message: err
            });
        } else {
            res.json({
                status: "success",
                message: "User Created",
                data: result
            });
        }

    }).catch((error) => {
        res.json({
            status: "error",
            message: error
        });
    });
}

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, (err, users) => {
        if (err) {
            res.json({
                status: "error",
                message: err
            });
        } else {
            res.json({
                status: "success",
                message: "User Created",
                data: users
            });
        }
    });
}

exports.deleteUser = (req, res) => {
    User.findByIdAndDelete(req.params.id, (err, success) => {
        if (err) {
            console.log(err)
        } else {
            console.log(success);
            res.send(success)
        }
    })
}