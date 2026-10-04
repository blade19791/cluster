import express from "express";
import { workerController } from "../controllers/worker.controller.js";

const router = express.Router();

router.get("/worker", workerController);

export default router;
