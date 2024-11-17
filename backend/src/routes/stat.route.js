import { Router } from "express";
import { protectRoute, requireAdmin } from "../middlewares/auth.middleware.js";
import { getAllStats } from "../controllers/stat.controller.js";

const router = Router()

router.get('/',protectRoute,requireAdmin,getAllStats)
export default router 