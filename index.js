const fastify = require('fastify')
// Import "mongoose"
const mongoose = require("mongoose")// Import our "User" model
const User = require("./User")
const app = fastify()
const mongoUrl = process.env.MONGODB_URI || "mongodb://localhost:27017/"/** connect to MongoDB datastore */
try {
    mongoose.connect(mongoUrl)
} catch (error) {
    console.error(error)
}
app.get("/api/users", (request, reply) => {
    User.find({}, (err, users) => {
        if (!err) {
            reply.send(users)
        } else {
            reply.send({ error: err })
        }
    })
})
app.get("/new", (request, reply) => {
    User.find({}, (err, users) => {
        if (!err) {
            reply.send(users)
        } else {
            reply.send({ error: err })
        }
    })
})
app.get("/api/users/:userId", (request, reply) => {
    var userId = request.params.userId
    User.findById(userId, (err, user) => {
        if (!err) {
            reply.send(user)
        } else {
            reply.send({ error: err })
        }
    })
})
app.post("/api/users", (request, reply) => {
    var user = request.body
    User.create(user, (err, user) => {
        if (!err) {
            reply.send(user)
        } else {
            reply.send({ error: err })
        }
    })
})
app.put("/api/users/:userId", (request, reply) => {
    var userId = request.params.userId
    var newUserEdit = request.body  
      User.findById(userId, (err, user) => {
        if (!err) {
            user.age = newUserEdit.age
            user.name = newUserEdit.name
            user.email = newUserEdit.email
            user.save((er, savedUser) => {
                if (!er) {
                    reply.send(savedUser)
                } else {
                    reply.send(er)
                }
            })
        } else {
            reply.send({ error: err })
        }
    })
})
app.put("/api/users/:userId", (request, reply) => {
    var userId = request.params.userId  
      User.findById(userId, (err, user) => {
        if (!err) {
            user.remove((er) => {
                if (!er) {
                    reply.send("USER DELETED")
                } else {
                    reply.send({ error: er })
                }
            })
        } else {
            reply.send({ error: err })
        }
    })
})// Start the server
app.listen(3000, function (err, address) {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening on ${address}`)
})
