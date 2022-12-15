let path = require('path'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    multer = require('multer'),
    upload = multer(),
    session = require('express-session'),
    cookieParser = require('cookie-parser')
const dotenv = require('dotenv').config();


app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(upload.array());
app.use(cookieParser());
app.use(session({secret: "Your secret key",
                  resave: false,
                  saveUninitialized: false,
                  cookie: {
                     expires: 600000,
                  },
})); 

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

//arquivos de rotas
var inicial = require("./routes/inicial");
var login = require("./routes/login");
var cadastro = require("./routes/cadastro");
var logout = require("./routes/logout");
var publicacoes = require("./routes/publicacao");
var users = require("./routes/user");
var cryptosearch = require('./routes/cryptosearch');

app.use("/", inicial);
app.use("/login", login);
app.use("/cadastro", cadastro);
app.use("/cryptosearch", cryptosearch);
app.use("/logout", logout);
app.use("/publicacoes", publicacoes);
app.use("/users", users);

//URL's inválidas
app.get('*', function(req, res){
   res.send('Desculpe, esta é uma URL inválida.');
});

app.listen(process.env.PORT || 3000);
