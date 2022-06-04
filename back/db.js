const mongoose = require("mongoose");

const mongo_URI =
	process.env.MONGODB_URI ||
	"mongodb+srv://karimpatron:25464357@myfirst.ujtlm.mongodb.net/myFirstDatabase?authSource=admin&replicaSet=atlas-jj1yjc-shard-0&w=majority&readPreference=primary&retryWrites=true&ssl=true";

mongoose.connect(mongo_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const dbConnect = mongoose.connection;

dbConnect.on("error", () => {
	console.log("error connecting to db");
});

dbConnect.on("connected", () => {
	console.log("Connected to mongoDB");
});

module.exports = dbConnect;
