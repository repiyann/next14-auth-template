import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default async function middleware(req: NextRequest) {
	const token = req.cookies.get('session')?.value
	const { pathname } = req.nextUrl

	const adminRoutes = new Set(['/admin/dashboard'])
	const userRoutes = new Set(['/user', '/user/profile'])
	const guestRoutes = new Set([
		'/',
		'/login',
		'/register',
		'/forgot-password',
		'/password-reset',
	])

	if (!token && guestRoutes.has(pathname)) {
		return NextResponse.next()
	}

	if (
		!token &&
		(adminRoutes.has(pathname) ||
			userRoutes.has(pathname) ||
			pathname === '/verify-email')
	) {
		return NextResponse.redirect(new URL('/login', req.url))
	}

	if (token) {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/auth/profile`,
			{
				method: 'GET',
				headers: { Authorization: `Bearer ${token}` },
			}
		)

		if (!response.ok) {
			return NextResponse.redirect(new URL('/login', req.url))
		}

		const data = await response.json()
		const { isEmailVerified, isAdmin } = data.data

		if (
			!isEmailVerified &&
			(guestRoutes.has(pathname) ||
				userRoutes.has(pathname) ||
				adminRoutes.has(pathname))
		) {
			return NextResponse.redirect(new URL('/verify-email', req.url))
		}

		if (
			isEmailVerified &&
			isAdmin &&
			(guestRoutes.has(pathname) || userRoutes.has(pathname))
		) {
			return NextResponse.redirect(new URL('/admin/dashboard', req.url))
		}

		if (
			isEmailVerified &&
			!isAdmin &&
			(guestRoutes.has(pathname) ||
				adminRoutes.has(pathname) ||
				pathname === '/verify-email')
		) {
			return NextResponse.redirect(new URL('/user', req.url))
		}
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|favicon.ico).*)'],
}
