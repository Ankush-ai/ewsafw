require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const rateLimiter = require("./middleware/rateLimiter");

const app = express();
app.use(cors());
app.use(rateLimiter);
app.use(express.json());

connectDB();

app.use("/api/v1/chapters", require("./routes/chapter.routes"));

app.get("/", (req, res) => res.send("MathonGo Chapter Dashboard API"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
