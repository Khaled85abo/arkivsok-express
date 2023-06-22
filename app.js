const express = require("express");
const app = express();

app.use(express.static("public"));
app.use(express.json());

const PORT = 3030;

app.get("/health", (req, res) => {
  res.status(200).send("Server is running");
});

app.post("/health", (req, res) => {
  const body = req.body;
  res.status(200).send(body);
});
app.get("/elastic", (req, res) => {
  res.status(200).send("Elastic is running");
});
app.post("/elastic", (req, res) => {
  const body = req.body;
  res.status(200).send(body);
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
