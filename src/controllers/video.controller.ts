
import VideoService from "@/services/video.service";
import { NextFunction, Request, Response } from "express";

class VideoController extends VideoService {
    public static downloadVideo = async (req: Request, res:Response, next: NextFunction) => {
        const {url, socket, itag}= req.query as {url: string, socket: string, itag: string};
        try {
            await VideoService.download({videoURL: url, socketId: socket, itag}, req, res)
        } catch (error) {
            next(error)
        }
    }
    public static videoDetails = async (req: Request, res: Response, next: NextFunction) => {
        const {url} = req.query as {url: string};
         try {
            const details = await VideoService.getDetails(url)
            return res.status(200).json(details)
         } catch (error) {
            next(error)
         }
    }

}
export { VideoController }