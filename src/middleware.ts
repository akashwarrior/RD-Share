import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Landing page or public route check
    if (pathname === '/' || pathname.startsWith('/auth')) {
        return NextResponse.next()
    }

    // TODO: checking auth status
    const isLoggedIn = true;

    if (!isLoggedIn) {
        // Redirect to login if not authenticated
        const loginUrl = new URL('/auth/login', request.url)
        return NextResponse.redirect(loginUrl)
    }

    // Allow access if authenticated
    return NextResponse.next()
}


export const config = {
    matcher: ['/((?!_next|api|favicon.ico).*)'],
}