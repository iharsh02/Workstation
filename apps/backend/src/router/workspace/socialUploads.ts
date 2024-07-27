import express, { Request, Response } from "express";
export const socialUploads = express.Router();

socialUploads.post("/", (req: Request, res: Response) => {
  // router for social uploads
});
