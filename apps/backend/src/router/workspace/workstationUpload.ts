import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import express, { Request, Response } from "express";
import multer from "multer";

const ACCESSKEY_ID = process.env.ACCESSKEY_ID;
const SECRETACCESSKEY = process.env.SECRETACCESSKEY;
const REGION = process.env.REGION;
const BUCKET = process.env.BUCKET;

if (!ACCESSKEY_ID || !SECRETACCESSKEY) {
  throw new Error("AWS credentials are not defined in environment variables.");
}

const s3client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: ACCESSKEY_ID,
    secretAccessKey: SECRETACCESSKEY,
  },
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const workstationUploads = express.Router();


interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

workstationUploads.post("/", upload.single('file'), async (req: MulterRequest, res: Response) => {
  try {
    
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const file = req.file;
    const filename = `${Date.now()}-${file.originalname}`;
    const contentType = file.mimetype || 'application/octet-stream'; 

    const command = new PutObjectCommand({
      Bucket: BUCKET,
      Key: `uploads/${filename}`,
      Body: file.buffer,
      ContentType: contentType,
    });

    await s3client.send(command);

    res.status(200).send("File uploaded successfully.");
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).send("Error uploading file.");
  }
});
