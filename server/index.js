require("dotenv").config();
const express = require('express');
const app = express();
const cors = require("cors");
const parser = require("body-parser");

const db = require("./models");

const errorHandler = require("./handlers/error");

const authRoutes = require("./routes/auth");
const messageRoutes  = require("./routes/messages");

const {loginRequired, ensureCorrectUser } = require("./middleware/auth");

const PORT = process.env.PORT || 3001;


app.use(cors());
app.use(parser.json());

//ROUTES

//Send all login/auth requests to ./routes/auth.js
app.use("/api/auth", authRoutes);
//Send all message requests to ./routes/messages.js
app.use("/api/user/:id/messages", 
    loginRequired, 
    ensureCorrectUser, 
    messageRoutes
);

app.get("/api/messages", loginRequired, async function(req, res, next) {
    try {
        let messages = await db.Message.find()
            .sort({createdAt : "desc"})
            .populate("user", {
                username : true,
                profileImageUrl : true
            });
            return res.status(200).json(messages);
    } catch(err) {
        next(err);
    }
});

//FALLBACK ROUTES
app.use(function(req, res, next) {
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use(errorHandler);

//LISTEN
app.listen(PORT, function() {
    console.log("Twatter Server running on port: " + PORT);
});