import express from "express";

const app = express();

//middleware
app.use(express.json());

//routes
export default app;
