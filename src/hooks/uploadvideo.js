import "dotenv/config";
import express from "express";
import cors from "cors";
import multer from "multer";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { r2 } from "./r2.js";

const app = express();
app.use(cors());

const upload = multer({
    storage: multer.memoryStorage(),
});

app.post("/upload-video", upload.single("video"), async (req, res) => {
    try {
        const file = req.file;

        if (!file) {
            return res.status(400).json({
                message: "No file",
            });
        }

        const fileName = `${Date.now()}-${file.originalname}`;

        await r2.send(
            new PutObjectCommand({
                Bucket: process.env.R2_BUCKET_NAME,
                Key: fileName,
                Body: file.buffer,
                ContentType: file.mimetype,
            })
        );

        const videoUrl =
            `${process.env.R2_PUBLIC_URL}/${fileName}`;

        res.json({
            success: true,
            url: videoUrl,
        });
    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Upload failed",
        });
    }
});

app.listen(3000, () => {
    console.log("Server running");
<<<<<<< HEAD
});
=======
});
>>>>>>> 18cd81db58f99492016c5fc38981480f505c3328
