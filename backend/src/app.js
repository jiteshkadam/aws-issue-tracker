const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const issueRoutes = require("./routes/issues.routes");
require ("./db/init");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/issues", issueRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

module.exports = app;
