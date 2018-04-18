const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    username : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    profileImageUrl : {
        type : String
    },
    messages : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Message"
    }]
});

//Before saving, hash the password if it has changed
UserSchema.pre("save", async function(next) {
    try {
        if(!this.isModified("password")) {
            return next;
        }
        this.password = await bcrypt.hash(this.password, 10);
    } catch(err) {
        return next(err);
    }
});

UserSchema.methods.comparePassword = async function(candidatePassword, next) {
    try {
        return isMatch = await bcrypt.compare(candidatePassword, this.password);
    } catch(err) {
        return next(err);
    }
}

const User = mongoose.model("User", UserSchema);

module.exports = User;
