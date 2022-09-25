require("dotenv").config();
const express = require("express");
const multer = require("multer");
const docClient = require("./configAWS");

//middleware
const app = express();
const convertFormToJson = multer();

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

app.post("/", convertFormToJson.fields([]), (req, res) => {
  const { id, name, quantity } = req.body;
  console.log();
  const params = {
    TableName: tableName,
    Item: {
      id: Number(id),
      name,
      quantity,
    },
  };
  console.log(id, name, quantity);
  docClient.put(params, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      return res.redirect("/");
    }
  });
});
app.post("/delete", convertFormToJson.fields([]), (req, res) => {
  const { id } = req.body;
  const params = {
    TableName: tableName,
    Key: {
      id: Number(id),
    },
  };
  docClient.delete(params, (err, data) => {
    if (err) return res.send("err");
    else return res.redirect("/");
  });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server started in port :${port}`);
});
