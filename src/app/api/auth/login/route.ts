import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { generateToken } from '@/lib/jwt';
import clientPromise from '@/lib/mongodb';

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        const client = await clientPromise;
        const db = client.db("news-db");

        // Tìm user theo email
        const user = await db.collection("users").findOne({ email });
        if (!user) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return NextResponse.json(
                { error: 'Invalid password' },
                { status: 401 }
            );
        }

        // Generate JWT token
        const token = generateToken({
            id: user._id,
            email: user.email,
            role: user.role
        });

        return NextResponse.json({
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                username: user.username
            }
        });
    } catch (error) {
        return NextResponse.json(
            { error: 'Login failed' },
            { status: 500 }
        );
    }
}