import express from "express";
import {
  workerController,
  workerStatusController,
  primaryStatusController,
} from "../controllers/worker.controller.js";

const router = express.Router();

router.get("/", workerController);
router.get("/stats", workerStatusController);
router.get("/primary-status", primaryStatusController);

export default router;
