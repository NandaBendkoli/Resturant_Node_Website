import express from "express";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDb } from "./src/config/config.js";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

// database connection
connectDb();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("welcome");
});

app.listen(PORT, () => {
  console.log(`Server Is Running on ${PORT} port`.white.bgMagenta);
});
