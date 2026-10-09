import express from "express";
import { slowController } from "../controllers/slow.controller.js";

const router = express.Router();

router.get("/slow", slowController);

export default router;
