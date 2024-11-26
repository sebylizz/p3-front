import { NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';

function hasAdminRole(token) {
    try {
        const decoded = jwtDecode(token);
        return decoded && decoded.groups && decoded.groups.includes("admin");
    } catch (error) {
        console.error("Invalid token:", error);
        return false;
    }
}

export function middleware(request) {
    const token = request.cookies.get('token')?.value;

    if (!token) {
        const url = request.nextUrl.clone();
        url.pathname = '/login';
        return NextResponse.redirect(url);
    }

    if (!hasAdminRole(token)) {
        const url = request.nextUrl.clone();
        url.pathname = '/login';
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],  // Applies middleware to /admin and all subpaths
};

