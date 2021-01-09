import mongoose from 'mongoose'

const msgsSchema = mongoose.Schema({
    _id: String,
    messages : [{ from : String, message: String, time: String}]
});

export default mongoose.model("msgs", msgsSchema)