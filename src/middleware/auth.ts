import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

// Định nghĩa interfaces
interface AuthSuccess {
    status: 200;
    user: {
        id: string;
        email: string;
        role: string;
    };
}

interface AuthError {
    status: 401 | 500;
    error: string;
}

type AuthResponse = AuthSuccess | AuthError;


export async function authMiddleware(req: Request): Promise<AuthResponse> {
    try {

        //Lấy token từ header
        const token = req.headers.get('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return {
                status: 401,
                error: 'Unauthorized - No token provided'
            };
        }

        // Verify token
        const decoded = verifyToken(token);
        if (!decoded) {
            return {
                status: 401,
                error: 'Unauthorized - Invalid token'
            };
        }

        return {
            status: 200,
            user: decoded as {
                id: string;
                email: string;
                role: string;
            }
        };

    } catch (error) {
        return {
            status: 500,
            error: 'Internal server error'
        };
    }
}