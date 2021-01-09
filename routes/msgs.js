import express from 'express'
import Msgs from '../models/msgs.js'
import Users from '../models/users.js'
const msgsRouter = express.Router()

msgsRouter.use(express.json())

msgsRouter.route('/')
.post((req, res) => {
    const ele = req.body
    Msgs.create({
        _id: ele._id,
        messages : [{from : ele.from, message : ele.message, time : ele.time}]
    }, async (err, data) => {
        if(err) res.status(500).send(err)
        else {
            Users.findById(ele.id1)
            .then((userRes) => {
                userRes.contacts.push({
                    _id : ele._id,
                    username : ele.username2,
                    email : ele.email2
                })
                userRes.save().then((data) => {
                    Users.findById(ele.id2)
                    .then((userRes1) => {
                        userRes1.contacts.push({
                            _id : ele._id,
                            username : ele.username1,
                            email : ele.email1
                        })
                        userRes1.save().then((responseF) => {
                            res.status(200).send(responseF)
                        })
                    })
                })
            })
        }
    })
})

msgsRouter.route('/:conId')
.get((req, res) => {
    Msgs.findById(req.params.conId, (err, data) => {
        if(err) res.status(500).send("error : "+ err)
        else res.status(200).send(data)
    })
})
.post((req, res) => {
    Msgs.findById(req.params.conId).then((response) => {
        response.messages.push({
            from : req.body.from,
            message : req.body.message,
            time : req.body.time
        })
        response.save().then((resp) => {
            res.status(201).send(resp)
        })
    })
})


export default msgsRouter