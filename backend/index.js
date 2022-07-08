const { Swaggiffy } = require("swaggiffy");
const dotenv = require("dotenv");
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

// import routes
const authRoutes = require("./routes/auth.routes");
const candidatesRoutes = require("./routes/candidates.routes");
const votesRoutes = require("./routes/votes.routes");

//Error Handler middleware
const ErrorHandler = require("./middleware/error");

dotenv.config({ path: "./config/config.env" });
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

// routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/candidates", candidatesRoutes);
app.use("/api/v1/votes", votesRoutes);

app.use(ErrorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

new Swaggiffy().setupExpress(app).swaggiffy();
