import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import clientPromise from '@/lib/mongodb';

export async function POST(req: Request) {
    try {
        const { email, password, username, role } = await req.json();

        const client = await clientPromise;
        const db = client.db("news-db");

        // Kiểm tra email đã tồn tại chưa
        const existingUser = await db.collection("users").findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { error: 'Email already registered' },
                { status: 400 }
            );
        }

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo tài khoản mới
        const newUser = await db.collection("users").insertOne({
            email,
            password: hashedPassword,
            username,
            role
        });

        return NextResponse.json(
            { message: 'Account created successfully' },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to create account' },
            { status: 500 }
        );
    }
}