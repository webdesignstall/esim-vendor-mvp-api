const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

exports.createToken = (user)=>{
    const payload = {
        '_id': user._id,
        'email': user.email,
        'mobile': user.mobile,
        'name': user.name
    };

    return jwt.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: '24h'
    });
}

exports.hashPassword = (password)=>{
    return bcrypt.hashSync(password);
}

exports.comparePassword = (password, hash)=>{
    return bcrypt.compareSync(password, hash);
}