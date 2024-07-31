import express from "express";
import {
  GetObjectCommand,
  S3Client,
  ListObjectsV2Command,
  _Object,
} from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

dotenv.config();

const ACCESSKEY_ID = process.env.ACCESSKEY_ID;
const SECRETACCESSKEY = process.env.SECRETACCESSKEY;
const REGION = process.env.REGION;
const BUCKET = process.env.BUCKET;

if (!ACCESSKEY_ID || !SECRETACCESSKEY || !REGION || !BUCKET) {
  throw new Error(
    "AWS credentials or bucket name are not defined in environment variables."
  );
}

const s3client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: ACCESSKEY_ID,
    secretAccessKey: SECRETACCESSKEY,
  },
});

async function getObjectURL(key: string) {
  const command = new GetObjectCommand({
    Bucket: BUCKET,
    Key: key,
  });
  const url = await getSignedUrl(s3client, command);
  return url;
}

export const workstation = express.Router();

workstation.get("/", async (req, res) => {
  try {
    const command = new ListObjectsV2Command({
      Bucket: BUCKET,
      Prefix: "uploads",
    });
    const result = await s3client.send(command);

    if (!result.Contents) {
      return res.status(404).json({ error: "No objects found in the bucket." });
    }

    const signedUrls = await Promise.all(
      result.Contents.map(async (item: _Object) => {
        if (item.Key) {
          const url = await getObjectURL(item.Key);
          return { key: item.Key, url };
        }
        return null;
      }).filter((item) => item !== null)
    );

    res.json({ signedUrls });
  } catch (error) {
    console.error("Error generating signed URLs:", error);
    res.status(500).json({ error: "Failed to generate signed URLs" });
  }
});
