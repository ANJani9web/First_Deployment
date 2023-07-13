const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/connectDb");

// config dotenv
dotenv.config();

// importing database connection
connectDB();

// rest objects
const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// routes
// app.get('/', (req, res) => {
//     res.send('Hello World! from server')
// }
// )

// routes for users
app.use("/api/v1/users", require("./routes/userRoute"));

// routes for transactions
app.use("/api/v1/transactions", require("./routes/transactionRoutes"));

// for build static files
app.use(express.static(path.join(__dirname, "./client/build/")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// server
const PORT = process.env.PORT || 8080;

// listening to server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.yellow.bold);
});

// package.json
