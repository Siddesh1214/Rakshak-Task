const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const quizRoutes = require("./routes/Quiz");

const dotenv = require("dotenv");
dotenv.config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const PORT = process.env.PORT;

const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const database = require("./config/database");
database.connect();

app.use(express.json());
app.use(cookieParser());

// app.use(cors({
//   origin: process.env.REACT_URL,
//     credentials:true,
// }))

app.use(
	cors({
		origin: process.env.REACT_URL,
		credentials: true,
	})
);

app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "/tmp",
	})
);

cloudinaryConnect();

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/quiz", quizRoutes);

app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Your server is running",
	});
});

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
