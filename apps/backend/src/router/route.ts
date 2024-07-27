import express from "express";
export const router = express.Router();
import { workstation } from "./workspace/workstation";
import { workstationUploads } from "./workspace/workstationUpload";
import { socialUploads } from "./workspace/socialUploads";

router.use("/workstation", workstation);
router.use("/workstation-uploads" , workstationUploads);
router.use("/social-uploads" , socialUploads);