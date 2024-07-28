import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import express, { Request, Response } from "express";

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

async function putObject(filename: any, contentType: any) {
  const command = new PutObjectCommand({
    Bucket: BUCKET,
    Key: `uploads/${filename}`,
    ContentType: contentType,
  });

  const url = await getSignedUrl(s3client, command);
  return url;
}

async function init() {
  console.log(
    "URL for uploading ",
    await putObject(`uploads-${Date.now()}`, "upload/jpeg")
  );
}

//  to delete a file in s3 bucket 
/*
async function deleteFile() {
    const command = new DeleteObjectCommand({
        Bucket : BUCKET,
        Key : 'your_key file location could be upload/jpeg'
    })

    await s3client.send(command);
    
}*/

// init();

export const workstationUploads = express.Router();
workstationUploads.post("/", (req: Request, res: Response) => {
  // POSt route to the workstation uploads
});
