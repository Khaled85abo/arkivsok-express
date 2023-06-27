"use strict";
const express = require("express");
const app = express();
const axios = require("axios");
const fetch = require("node-fetch");
const dotenv = require("dotenv");
dotenv.config();
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// let BASE_URL = "elasticsearch-oss:9200/sharepoint";
let BASE_URL = "https://swapi.dev/api/";
axios.BASE_URL = BASE_URL;
let PORT = process.env.PORT ?? 8080;
app.get("/api/health", (req, res) => {
  res.status(200).send("Server is running");
});

app.post("/api/health", (req, res) => {
  const body = req.body;
  res.status(200).send(body);
});
app.get("/api/elastic", (req, res) => {
  res.status(200).send("Elastic is running");
});
app.post("/api/elastic", (req, res) => {
  const body = req.body;
  res.status(200).send(body);
});
app.get("/api/swapi", async (req, res) => {
  try {
    // Make the API request using Axios
    const response = await axios.get(`${BASE_URL}people`);

    // Handle the response
    res.json(response.data);
  } catch (error) {
    // Handle any errors that occur during the request
    console.error(error);
    res.status(500).json({ error });
  }
});
app.post("/api/customURL/fetch", async (req, res) => {
  const url = req.body.url;
  const query = req.body.query;
  console.log(query);
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(query),
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});
app.post("/api/customURL/axios", async (req, res) => {
  const url = req.body.url;
  const query = req.body.query;
  console.log(query);
  try {
    const response = await axios.post(url, query);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});
app.post("/api/customURL", async (req, res) => {
  const url = req.body.url;
  try {
    const response = await axios.get(url);
    // Handle the response
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
