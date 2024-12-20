// Valentin Belii c0886610
// CSD-3102 Full Stack JavaScript
import express from "express";
import cors from "cors";
import users from "./routes/user.js";
import dotenv from 'dotenv';
dotenv.config()

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/users", users);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
