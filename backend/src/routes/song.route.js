import { Router } from "express";
import { protectRoute, requireAdmin } from "../middlewares/auth.middleware.js";

import { getAllSongs, getFeaturedSongs, getMadeForYou, getTrending } from "../controllers/song.controller.js";

const router = Router()

router.get('/',protectRoute,requireAdmin,getAllSongs)
router.get('/featured',getFeaturedSongs)
router.get('/made-for-you',getMadeForYou)
router.get('/trending',getTrending)
export default router 