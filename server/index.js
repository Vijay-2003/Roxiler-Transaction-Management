import express from "express";
import cors from 'cors';
import 'dotenv/config'

import connectDB from './config/Mongodbconnection.js';
import route from "./routes/Transactionsroute.js";

const PORT = process.env.PORT || 3000
const app = express();

app.use(express.json());
app.use(cors());
connectDB();

app.get("/", (req, res) => {
  res.send({
    message: "Server running",
    port: PORT,
  });
});

app.use('/api', route);

app.listen(PORT, console.log(`SERVER RUNNING: ${PORT}`));
