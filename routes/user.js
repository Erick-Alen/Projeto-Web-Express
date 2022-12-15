var express = require("express");
var router = express.Router();
var User = require("../models/User");
var session = require('express-session');

session({secret: "Your secret key",
                  resave: false,
                  saveUninitialized: false,
                  cookie: {
                     expires: 600000,
                  },
});


router.get('/', async function(req, res){
    const busca = req.query.busca;

    if(req.session.user){
        if(!busca){
            let users = await User.findSome({});
            res.render('users_busca', {status: "Todos os usuários", 
                                                 users: users,
                                                 email: "E-mail",
                                                 nome: "Nome"});
        }else{
            let users = await User.findSome({nome: new RegExp(`${busca}`, 'i')});
    
            if(users.length == 0){
                res.render('users_busca', {status: "Usuário não encontrado!"});
            }else{
                res.render('users_busca', {status: "Usuários encontrados", 
                                                 users: users,
                                                 email: "E-mail",
                                                 nome: "Nome"});
            }
        }
    }else{
        res.redirect('/login');
    }
 });

router.get("/:nome", async function(req, res){
    if(req.session.user){
        let user = await User.findOne(req.params.nome);
        res.render('user', user);
    }else{
        res.redirect('/login');
    }
});

module.exports = router;