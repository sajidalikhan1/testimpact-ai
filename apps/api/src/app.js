const express = require("express");
const cors = require("cors");

const healthRoutes = require("./routes/health.routes");
const analysisRoutes = require("./routes/analysis.routes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
  })
);

app.use(express.json({ limit: "1mb" }));

app.use("/api/v1/health", healthRoutes);
app.use("/api/v1/analysis", analysisRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found.",
  });
});

app.use(errorHandler);

module.exports = app;