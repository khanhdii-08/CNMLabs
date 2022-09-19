require("dotenv").config();
const express = require("express");
// const docClient = require("./configAWS");
const app = express();

app.use(express.json({ extended: false }));
app.use(express.static("./views"));
app.set("view engine", "ejs");
app.set("views", "./views");

const AWS = require("aws-sdk");

const config = new AWS.Config({
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEY,
  region: process.env.REGION,
});

AWS.config = config;

const docClient = new AWS.DynamoDB.DocumentClient();

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
