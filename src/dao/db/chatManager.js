import chatModel from "../models/chat.model.js";

class chatManager{
    addMsg = async(message)=>{
        const result = await chatModel.create(message)
        console.log("result del chat", result)
    }

}


export default chatManager