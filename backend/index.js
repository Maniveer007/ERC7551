const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const connectDB = require("./database/DB");
const transactionRoutes = require("./routes/TransactionRoutes");
require("dotenv").config();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
connectDB();

app.use("/transactions", transactionRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
