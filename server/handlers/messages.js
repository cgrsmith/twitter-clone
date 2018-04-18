const db = require("../models");


// POST to /api/users/:id/messages
exports.createMessage = async function(req, res, next) {
    try {

        let message = await db.Message.create({
            text : req.body.text,
            user : req.params.id
        });

        let foundUser = await db.User.findById(req.params.id);
        foundUser.messages.push(message._id);
        await foundUser.save();

        let foundMessage = await db.Message.findById(message._id).populate("user", {
            username : true,
            profileImageUrl : true
        });

        return res.status(200).json(foundMessage);
    } catch(err) {
        return next(err);
    }
}

// GET to /api/users/:id/messages/:message_id
exports.getMessage = async function(req, res, next) {
    try {
        let message = await db.Message.find(req.params.message_id);
        res.status(200).json(message);
    } catch(err) {
        return next(err);
    }
}

// DELETE to /api/users/:id/messages/:messageID
exports.deleteMessage = async function(req, res, next) {
    try {
        let message = await db.Message.findById(req.params.message_id);
        await message.remove();
        res.status(200).json(message);
    } catch(err) {
        return next(err);
    }
}