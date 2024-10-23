import express from "express";
import mongoose from "mongoose"; 
import bodyParser from "body-parser";
import router from "./routes/todoroute.js";
import dotenv from "dotenv";
import cors from 'cors';


dotenv.config();
const app = express();

app.use(bodyParser.json());


const mongoURI = process.env.DB;

mongoose
  .connect(mongoURI )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error.message);
  });


app.use(cors())

app.use('/api', router);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
