import express from "express";
import cors from "cors";
import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";

// import routes
import transactionRoutes from "./routes/Transaction";

dotenv.config();

const app = express();
const PORT = 5000 || process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());

// DB connection
const uri: string = process.env.MONGO_URI as string;
mongoose
  .connect(uri!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then((res) => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(`DB connection error`, err);
  });

// Routes
app.use("/api/transactions", transactionRoutes); // TODO: Add authentication middleware

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
