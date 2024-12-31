'use server'

import { cookies } from 'next/headers'

export async function setSessionCookie(token: string) {
	cookies().set('session', token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		path: '/',
	})
}
