import express from "express";
import {
  workerController,
  workerStatusController,
} from "../controllers/worker.controller.js";

const router = express.Router();

router.get("/", workerController);
router.get("/stats", workerStatusController);

export default router;
