import { cookies } from 'next/headers'

export async function POST() {
	const token = cookies().get('session')!.value
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
		{
			method: 'POST',
			headers: { Authorization: `Bearer ${token}` },
		}
	)

	if (!response.ok) {
		const errorMessage =
			(await response.text()) || 'An unexpected error occurred'
		return new Response(
			JSON.stringify({
				status: 'error',
				message: errorMessage,
			}),
			{ status: response.status }
		)
	}

	cookies().delete('session')

	return new Response(
		JSON.stringify({ status: 'success', message: 'Successfully logged out' }),
		{ status: 200 }
	)
}
