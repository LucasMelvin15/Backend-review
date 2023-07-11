const express = require("express");
const app = express();
const path = require("path");
const PORT = 3000;
//const routes = require("./routes");

app.use((req, res, next) => {
  console.log(`${req.method}${req.path}`);
  next();
});

app.use(express.json());
app.use("/", express.static(path.join(__dirname, "/public")));
//routes
app.use("/", require("./routes/root"));
app.use("/employees", require("./routes/api/employees"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on ${PORT}`);
});
