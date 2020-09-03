// code away!
require('dotenv').config()
const express = require('express')
const server = express()
const cors = require('cors')
const time = require('express-timestamp')
const userRouter = require('./users/userRouter')
const postRouter = require('./posts/postRouter')
server.use(express.json())
server.use(cors())
server.use(time.init)
server.use(logger)



server.use("/api/users", userRouter)
server.use("/api/post", postRouter)

function logger(req, res, next) {
  console.log(`a ${req.method} request was made to ${req.url} and it took ${req.timestamp}`)
  next()
}

// const port = 8000
const port = process.env.PORT

server.listen(port, ()=>{
    console.log(`Server listening on port: ${port}`)
})



