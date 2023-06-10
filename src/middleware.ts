import { NextResponse } from "next/server";

const allowedOrigins = process.env.NODE_ENV === 'production'
    ? ['https://www.yoursite.com', 'https://yoursite.com']
    : ['http://localhost:3000', 'http://127.0.0.1:3000', 'https://www.google.com']

export function middleware(request: Request) {
    const origin = request.headers.get('origin')
    // for production: origin && !allowedOrigins.includes('origin') || !origin VERIFY
    if (origin && !allowedOrigins.includes('origin')) {
        return new NextResponse(null, {
            status: 400,
            statusText: 'Bad Request - Now Allowed',
            headers: {
                'Content-Type': 'text/plain'
            }
        })
    }

    return NextResponse.next()
}

export const config = {
    matcher: '/api/:path*'
}