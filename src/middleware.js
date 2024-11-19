import { NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';

function hasAdminRole(token) {
    try {
        const decoded = jwtDecode(token);
        console.log(decoded);
        return decoded && decoded.groups && decoded.groups.includes("admin");
    } catch (error) {
        console.error("Invalid token:", error);
        return false;
    }
}

export function middleware(request) {
    console.log("Middleware running for route:", request.nextUrl.pathname);

    const token = request.cookies.get('token')?.value;
    console.log("Token found:", token);

    if (!token) {
        console.log("Redirecting due to missing token");
        const url = request.nextUrl.clone();
        url.pathname = '/login';
        return NextResponse.redirect(url);
    }

    if (!hasAdminRole(token)) {
        console.log("Redirecting due to insufficient role");
        const url = request.nextUrl.clone();
        url.pathname = '/login';
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],  // Applies middleware to /admin and all subpaths
};

