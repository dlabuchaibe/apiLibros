const express = require('express');
const router = express.Router();
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const serviUsers = require('./../../services/users');
const config = require('./../../../config');

router.route('/')
.post((req, res) => {
    const myPlaintextPassword = req.body.password;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(myPlaintextPassword, salt);
    let newUser = {
        id : serviUsers.userArrLength(),
        username : req.body.username,
        password : hash
    };
    let newUserUsername = newUser.username
    !!serviUsers.usersArray.find(user => user.username === newUserUsername) ?
    res.status(500).send(`El usuario ${newUser.username}, ya existe`) : serviUsers.usersArray.push(newUser)
    res.status(200).send(`El usuario ${newUser.username}, fue creado`);   
});

router.route('/login')
.post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const token = jwt.sign({ username: username }, config.secretKey); 
    !!serviUsers.usersArray.find(user => user.username === username && bcrypt.compareSync(password, user.password)) ? 
    res.status(200).send(`{token: ${token}}`) :
    res.status(500).send(`Datos no validos`);
});

module.exports = router;