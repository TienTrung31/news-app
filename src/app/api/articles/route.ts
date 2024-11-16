import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { authMiddleware } from "@/middleware/auth";
import path from "path";
import { writeFile } from "fs/promises";
import { mkdir } from "fs/promises";

export async function GET(req: Request) {
    try {
        // Lấy category từ URL params
        const { searchParams } = new URL(req.url);
        const category = searchParams.get('category');

        const client = await clientPromise;
        const db = client.db("news-db");

        // Query với điều kiện category nếu có
        const query = category ? { category } : {};

        const articles = await db
            .collection("articles")
            .find(query)
            .sort({ publishedAt: -1 })
            .toArray();

        return NextResponse.json(articles);
    } catch (e) {
        console.error("GET Error:", e);
        return NextResponse.json(
            { error: 'Failed to fetch articles' },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        // Kiểm tra xác thực
        const auth = await authMiddleware(req);
        if (auth.status !== 200) {
            return NextResponse.json(
                { error: auth.error },
                { status: auth.status }
            );
        }

        // Lấy formData từ request
        const formData = await req.formData();

        // Xử lý file ảnh
        let imageUrl = '';
        const file = formData.get('image') as File;

        if (file) {
            try {
                // Tạo tên file unique
                const fileName = `${Date.now()}-${file.name}`;

                // Đảm bảo thư mục uploads tồn tại
                const publicPath = path.join(process.cwd(), 'public', 'uploads');
                await mkdir(publicPath, { recursive: true });

                // Đường dẫn đầy đủ của file
                const filePath = path.join(publicPath, fileName);

                // Đọc và lưu file
                const bytes = await file.arrayBuffer();
                const buffer = Buffer.from(bytes);
                await writeFile(filePath, buffer);

                // Lưu đường dẫn tương đối để serve file
                imageUrl = `/uploads/${fileName}`;
            } catch (error) {
                console.error("File upload error:", error);
                return NextResponse.json(
                    { error: 'Failed to upload image' },
                    { status: 500 }
                );
            }
        }

        // Tạo object article từ formData
        const article = {
            title: formData.get('title'),
            description: formData.get('description'),
            content: formData.get('content'),
            category: formData.get('category'),
            image: imageUrl,
            author: auth.user.id,
            publishedAt: new Date(),
        };

        // Validate dữ liệu
        if (!article.title || !article.content) {
            return NextResponse.json(
                { error: 'Title and content are required' },
                { status: 400 }
            );
        }

        // Lưu vào database
        const client = await clientPromise;
        const db = client.db("news-db");
        const result = await db
            .collection("articles")
            .insertOne(article);

        return NextResponse.json({
            success: true,
            articleId: result.insertedId,
            article: article
        });

    } catch (error) {
        console.error("POST Error:", error);
        return NextResponse.json(
            { error: 'Failed to create article' },
            { status: 500 }
        );
    }
}