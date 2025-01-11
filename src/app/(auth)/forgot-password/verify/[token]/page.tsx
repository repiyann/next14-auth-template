import api from '@/lib/api'
import VerificationCard from './card'

export default async function VerifyPasswordTokenPage({
	params,
}: {
	params: Promise<{ token: string }>
}) {
	const token = (await params).token
	let errorMessage: string | undefined

	try {
		await api.get(`/auth/password/reset/${token}`)
	} catch (error) {
		errorMessage =
			error instanceof Error ? error.message : 'An unexpected error occurred'
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500">
			<VerificationCard errorMessage={errorMessage} token={token} />
		</div>
	)
}
