const express = require("express");
const cors = require('cors');
const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize("sqlite:./main.db", {
    logging: false,
    dialect: "sqlite",
    define: {
        timestamps: false,
    },
});

class User extends Model {}
User.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    avatar: DataTypes.STRING,
    wiki: DataTypes.STRING
}, { sequelize, modelName: "Users" });


const app = express();
app.use(express.json());
app.use(cors());
const port = 3000;

(async() => {
    await sequelize.sync({ alter: true });

    app.get('/users', async(req, res) => {
        const all = await User.findAll();
        res.send(JSON.stringify(all))
    });

    app.post('/users', async(req, res) => {
        console.log(req);
        if (true) {
            const user = await User.create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                avatar: req.body.avatar, 
                wiki: req.body.wiki
            });
        }
        res.status(201).send('{"code":201}');
    });

    app.get('/users/:id', async(req, res) => {
        if (req.params.id < 1) {
            return res.status(400).send({ msg: "Negative index" })
        }
        user = await User.findByPk(req.params.id)
        if (user === null) {
            return res.status(404).send({ msg: "Not found" })
        }
        return res.status(200).send(user).header()
    });

    app.delete('/users/:id', async(req, res) => {
        if (req.params.id < 1) {
            return res.status(400).send({ msg: "Negative index" })
        }
        user = await User.findByPk(req.params.id)
        if (user === null) {
            return res.status(404).send({ msg: "Not found" })
        }
        await user.destroy()
        res.status(200).send({ msg: "User was deleted" })
    });

    app.put('/users/:id', async(req,res) => {
        user = await User.findByPk(req.params.id)
        if (user === null) {
            return res.status(404).send({ msg: "Not found" })
        }
        var body = req.body
        if(body.first_name == '' || body.last_name == '' || body.avatar == '' || body.wiki == '') {
            return res.status(400).send({ msg: "Incorrect request" })
        }
        if(body.first_name!= "") user.first_name = body.first_name
        if(body.last_name!= "") user.last_name = body.last_name
        if(body.avatar!= "") user.avatar = body.avatar
        if(body.wiki!= "") user.wiki = body.wiki
        await user.save()
        res.status(200).send({ msg: "User was updated" })
    })

})();


app.listen(port, () => {
    console.log(`Сервер был запущен: http://localhost:${port}\n`);
})


// https://www.toptal.com/developers/gitignore/api/csharp