import mongoose from "mongoose"

const chatCollection = 'chats'

const chatSchema = new mongoose.Schema({
    user: String,
    message: String
})

const chatModel = mongoose.model(chatCollection, chatSchema)

export default chatModel