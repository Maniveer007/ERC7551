const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const connectDB = require("./database/DB");
const transactionRoutes = require("./routes/TransactionRoutes");
const accountRoutes = require("./routes/AccountRoutes");
const nodeRoute=require("./routes/NodeRoutes")

require("dotenv").config();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
connectDB();

app.use("/transactions", transactionRoutes);
app.use("/account", accountRoutes);
app.use("/node", nodeRoute);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
