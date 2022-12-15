const MongoClient = require("mongodb").MongoClient;
var sha256 = require('js-sha256');

module.exports = class User{

    static async insert(data){
        const conn = await this.startConn(),
              db = conn.db();
        
        db.collection("users").insertOne({
            nome: data.nome,
            username: data.username,
            email: data.email,
            senha: sha256(data.senha).toString(),
            publicacoes: 0
        },
        function(err, res){
            conn.close();
        });
    }

    static async findOne(email){
        const conn = await this.startConn(),
              db = conn.db();
        
        let user = await db.collection("users").findOne({email: email});

        conn.close();
        return user;
    }

    static async findUserSenha(email, senha){
        const conn = await this.startConn(),
              db = conn.db();
        
        let user = await db.collection("users").findOne({email: email, senha: senha});

        conn.close();
        return user;
    }

    static async findSome(query){
        const conn = await this.startConn(),
              db = conn.db();
        
        let publicacoes = await db.collection("users").find(query,
                                                                  {projection: {
                                                                    _id: 0,
                                                                    senha: 0
                                                                   }}).toArray();

        conn.close();
        return publicacoes;
    }

    static async updateOne(email, new_values){
        const conn = await this.startConn(),
              db = conn.db();
        
        await db.collection("users").updateOne({email: email}, new_values);

        conn.close();
    }

    static async startConn(){
        return await MongoClient.connect(process.env.MONGO_URL);
    }

}