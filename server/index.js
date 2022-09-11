const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();
const PORT = process.env.PORT;
const dbConn = require("./config/db_config");

app.use(cors());
app.use(express.json());

app.get("/test", (req, res) => {
  res.send("Hello World");
});

const questionRoutes = require("./router/question");
const answerRoutes = require("./router/answer");
const loginRoutes = require("./router/student");
const subjectRoutes = require("./router/subject");
const admin = require("./router/admin");
const classroom = require("./router/classroom");
const { errorHandler } = require("./helper/errorHandler");

// api routes
app.use("/question", questionRoutes);
app.use("/answer", answerRoutes);
app.use("/login", loginRoutes);
app.use("/subject", subjectRoutes);
app.use("/admin", admin);
app.use("/classroom", classroom);

app.all("*", (req, res, next) => {
  const err = new Error(`Requested URL ${req.path} not found`);
  err.statusCode = 404;
  next(err);
});

// global error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
