import mongoose from 'mongoose'

const usersSchema = mongoose.Schema({
    _id: String,
    username : String,
    email: String,
    contacts: [{_id: String, username: String, email: String}]
});

export default mongoose.model("users", usersSchema)