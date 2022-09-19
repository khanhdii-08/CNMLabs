require("dotenv").config();
const express = require("express");
const docClient = require("./configAWS");
const app = express();

app.use(express.json({ extended: false }));
app.use(express.static("./views"));
app.set("view engine", "ejs");
app.set("views", "./views");

const tableName = "SanPham";

app.get("/", (req, res) => {
  const params = {
    TableName: tableName,
  };

  docClient.scan(params, (err, data) => {
    if (err) res.send("err");
    else return res.render("index", { sanPhams: data.Items });
  });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server started in port :${port}`);
});
