let express = require("express");
let router = express.Router();
let User = require("../models/User");

router.get('/', function(req, res){
    res.render('cadastro');
 });

router.post("/", async function(req, res){
    let usuario = await User.findOne(req.body.email);
    if(!usuario){
        await User.insert(req.body);
        console.log("Usuário cadastrado!!!")
        res.redirect("/login");
    } else {
        res.send("email já cadastrado, faça o Login.");
        console.log("nome:"+usuario.nome+'\n'+"email:"+usuario.email+'\n'+"senha:"+usuario.senha);
    }
})

module.exports = router;