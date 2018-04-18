const mongoose = require("mongoose");
const User = require("./user");

const MessageSchema = new mongoose.Schema({
    text : {
        type : String,
        required : true,
        maxLength : 140
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
}, {
    timestamps : true
});

MessageSchema.pre("remove", async function(next) {
    //remove a message from a users list
    try {
        //Find user owning the message and deletes this message
        let user = await User.findById(this.user);
        user.messages.remove(this.id);
        await user.save();
        return next();
    } catch (err){
        return next(err);
    }
});

const Message = mongoose.model("Message", MessageSchema);
module.exports = Message; 