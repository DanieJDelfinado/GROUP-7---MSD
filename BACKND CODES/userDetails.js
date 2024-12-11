const mongoose = require("mongoose");

const UserDetailSchema = new mongoose.Schema({
    username: String,
    password: String,
}, {
    collection: "UserInfo",
});

const UserInfo = mongoose.model("UserInfo", UserDetailSchema);

module.exports = UserInfo;

