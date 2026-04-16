const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/assets", require("./routes/assets"));
app.use("/api/transfers", require("./routes/transfers"));
app.use("/api/assignments", require("./routes/assignments"));

app.listen(process.env.PORT || 5000, () => console.log("Server running on port 5000"));
