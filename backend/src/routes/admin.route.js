import { Router } from "express";

const router = Router()
import {checkAdmin, createAlbum, createSong, deleteAlbum, deleteSong } from "../controllers/admin.controller.js";
import { protectRoute, requireAdmin } from "../middlewares/auth.middleware.js";

//slightly optimized cleam code to apply  midddleware to all of the beloww endpoints
router.use(protectRoute,requireAdmin)
router.get("/check",checkAdmin)
router.post('/songs',createSong)
router.delete('/songs/:id',deleteSong)
router.post('/album',createAlbum)
router.delete('/album/:id',deleteAlbum)
export default router 