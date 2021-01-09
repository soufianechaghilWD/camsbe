import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors';


import usersRouter from './routes/users.js'
import msgsRouter from './routes/msgs.js'

const app =express()
const port = process.env.PORT ||7000

const connection_url = 'mongodb://localhost:27017/chat'

const db = mongoose.connection

db.once('open', () => {
    console.log('DB is connected')
})


app.use(express.json())
app.use(cors())
app.use('/users', usersRouter)
app.use('/msgs', msgsRouter)

mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})


app.get('/', (req, res) => res.status(200).send('hello world'))

app.listen(port, () => console.log(`Listening on localhost:${port}`))