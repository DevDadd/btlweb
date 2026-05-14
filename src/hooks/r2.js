import { S3Client } from "@aws-sdk/client-s3";

export const r2 = new S3Client({
    region: 'auto',
    endpoint: process.env.R2_URL,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY
    }
<<<<<<< HEAD
})
=======
})
>>>>>>> 18cd81db58f99492016c5fc38981480f505c3328
