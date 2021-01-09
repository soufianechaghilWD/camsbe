import express from 'express'
import users from '../models/users.js'
import Users from '../models/users.js'


const usersRouter = express.Router()

usersRouter.use(express.json())

usersRouter.route('/')
.post((req, res) => {
    const data = req.body
    Users.create(data, (err, data) => {
        if(err) res.status(500).send(err)
        else res.status(201).send(data)
    })
})
.get((req, res) => {
    Users.find((err, data) => {
        if(err) res.status(500).send(err)
        else res.status(200).send(data)
    })
})

usersRouter.route('/:userId')
.get((req, res) => {
    users.findById(req.params.userId, (err, data) => {
        if(err) res.status(500).send(err)
        else res.status(200).send(data)
    })
})

export default usersRouter