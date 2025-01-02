import api from '@/lib/api'
import { cookies } from 'next/headers'
import VerificationCard from './card'

export default async function VerifyEmailConfirmation({
	params,
}: {
	params: Promise<{ token: string }>
}) {
	const token = (await params).token
	const session = cookies().get('session')!.value
	let isAdmin: boolean | undefined
	let errorMessage: string | undefined

	try {
		const response = await api.get(`/auth/verify/email/${token}`, {
			data: { token: session },
		})
		isAdmin = response.data
	} catch (error) {
		errorMessage =
			error instanceof Error ? error.message : 'An unexpected error occurred'
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500">
			<VerificationCard isAdmin={isAdmin} errorMessage={errorMessage} />
		</div>
	)
}
