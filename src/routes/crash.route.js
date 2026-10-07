import { crashController } from "../controllers/crash.controller.js";
import express from "express";

const router = express.Router();

router.get("/", crashController);

export default router;
