import express from "express";
import {
  GetObjectCommand,
  S3Client,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

dotenv.config();

const ACCESSKEY_ID = process.env.ACCESSKEY_ID;
const SECRETACCESSKEY = process.env.SECRETACCESSKEY;
const REGION = process.env.REGION;
const BUCKET = process.env.BUCKET;

if (!ACCESSKEY_ID || !SECRETACCESSKEY || !REGION) {
  throw new Error("AWS credentials are not defined in environment variables.");
}

const s3client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: ACCESSKEY_ID,
    secretAccessKey: SECRETACCESSKEY,
  },
});

async function getObjectURL(key: any) {
  const command = new GetObjectCommand({
    Bucket: BUCKET,
    Key: key,
  });
  const url = await getSignedUrl(s3client, command);
  return url;
}

// async function init() {
//   console.log(`URL for video `, await getObjectURL("uploads/uploads-1722176212652"));
// }
// init();


export const workstation = express.Router();
// db.client.workstation.findUnique({})
workstation.get("/", async (req, res) => {
    const command = new ListObjectsV2Command({
      Bucket : BUCKET,
      Prefix: 'uploads',
    })
    const result = await s3client.send(command);
    res.json({
      result
    })
});
