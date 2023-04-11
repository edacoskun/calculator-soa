// Require Express module
const express = require("express");
const bodyparser = require('body-parser')
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyparser.json({
  strict:false
}))

// Add routes for each operation
app.get("/add", (req, res) => {
  const { number1, number2 } = req.query;
  const result = parseFloat(number1) + parseFloat(number2);
  console.log("Add operatörüne istek geldi.");
  res.send(result.toString());
});

app.get("/subtract", (req, res) => {
  const { number1, number2 } = req.query;
  const result = parseFloat(number1) - parseFloat(number2);
  console.log("Subtract operatörüne istek geldi.");
  res.send(result.toString());
});

app.get("/multiply", (req, res) => {
  const { number1, number2 } = req.query;
  const result = parseFloat(number1) * parseFloat(number2);
  console.log("Multiply operatörüne istek geldi.");
  res.send(result.toString());
});

app.get("/divide", (req, res) => {
  const { number1, number2 } = req.query;
  const result = parseFloat(number1) / parseFloat(number2);
  console.log("Divide operatörüne istek geldi.");
  res.send(result.toString());
});

// Start server
app.listen(5000, () => {
  console.log("Servis 5000 portu ile çalışıyor...");
});
