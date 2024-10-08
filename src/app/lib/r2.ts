import { S3Client } from "@aws-sdk/client-s3";

export const r2 = new S3Client({
    region: 'auto',
    endpoint: process.env.R2_ENDPOINT_URL ?? undefined,
    credentials: {
        accessKeyId: process.env.R2_ACESS_KEY_ID ?? '',
        secretAccessKey: process.env.R2_SECRET_ACESS_KEY ?? ''
    }
}) // Configurando o S3, endpoint, região e etc