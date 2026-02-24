import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("welcome");
});

app.listen(8000, () => {
  console.log(`Server Is Running on 8000 port`);
});
