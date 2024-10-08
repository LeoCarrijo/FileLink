import { PutObjectCommand } from "@aws-sdk/client-s3";
import { error } from "console";
import { NextResponse } from "next/server";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { r2 } from "@/app/lib/r2";

export const runtime = 'nodejs'

export async function POST(request: Request): Promise<NextResponse> {
    try {
        const {filename, contentType} = await request.json()
        if(!filename || !contentType) {
            return NextResponse.json({
                error: 'filename ou contentType nulos'
            }, {
               status: 400 
            })
        }
        const key = `${Date.now()}-${filename}` // chave para tornar url dos arquivos difíceis de se acessar
        const expiresAt = (Date.now() + 600000).toString() // variável para calcular o tempo que a url vai ficar disponível (Date.now() + 600000).toString() = 10 minutos
        const command = new PutObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Key: key,
            ContentType: contentType,
            Metadata: {
                expiresat: expiresAt
            }
        })
        const assignedUrl = await getSignedUrl(r2, command, {expiresIn: 600})
        return NextResponse.json({
            url: assignedUrl,
            key
        })
    } catch(e) {
        return NextResponse.json({
            error: `Ocorreu um erro ao gerar a URL: ${e}`
        }, {
            status: 500
        })
    }
}