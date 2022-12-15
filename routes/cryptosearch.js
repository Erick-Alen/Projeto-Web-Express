var express = require("express")
var router = express.Router()
var session = require('express-session');

session({secret: "Your secret key",
                  resave: false,
                  saveUninitialized: false,
                  cookie: {
                     expires: 600000,
                  },
});

router.get('/', function(req, res){

   if(req.session.user){
      res.render('cryptosearch');
   }else{
      console.log('SENHA INCORRETA');
      res.redirect('login');
   }
 });

module.exports = router;