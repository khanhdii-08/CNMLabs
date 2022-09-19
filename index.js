require("dotenv").config();
const express = require("express");

const app = express();

app.use(express.json({ extended: false }));
app.use(express.static("./views"));
app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", (req, res) => {
  return res.render("index");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server started in port :${port}`);
});
