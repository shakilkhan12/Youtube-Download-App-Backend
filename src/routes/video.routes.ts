

import { VideoController } from "@/controllers";
import { Router } from "express";
const router  = Router();
router.get('/video-details', VideoController.videoDetails)
router.get('/download', VideoController.downloadVideo)
export { router as videoRouter}