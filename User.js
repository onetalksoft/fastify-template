/* 
initiated mongoose schema
 if you dont want using mongoose schema you can add mongodb official package to code base. 
 That will be more straight forward
     
 */

const mongoose = require('mongoose')
let UserSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String
})
module.exports = mongoose.model('User', UserSchema)
