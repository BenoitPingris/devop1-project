const express = require("express")
const cors = require("cors")
const Sequelize = require('sequelize')

const sequelize = new Sequelize('devops', 'devops', 'docker', {
    host: 'mysql',
    dialect: 'mysql',
    operatorAliases: false,
    port: 3306,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.posts = require("./post.model.js")(sequelize, Sequelize);
db.sequelize.sync()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/ping', (req, res) => {
    res.json({ message: 'pong!' })
})

app.get('/posts', async (req, res) => {
    res.send(await db.posts.findAll())
})

app.post('/posts', async (req, res) => {
    console.log(req.body)
    if (!req.body.title || !req.body.content) {
        return res.sendStatus(422)
    }
    try {
        res.send(await db.posts.create({
            title: req.body.title,
            content: req.body.content
        }))
    } catch (error) {
        res.status(500).json(error)
    }
})

app.delete('/posts/:id', async (req, res) => {
    const num = await db.posts.destroy({ where: { id: req.params.id } })
    if (num === 1) {
        return res.json({ message: 'Post deleted.' })
    }
    res.json({ message: `Cannot delete post ${id}` })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})