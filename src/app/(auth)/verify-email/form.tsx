'use client'

import api from '@/lib/api'
import { useRouter } from 'next/navigation'
import { TokenProps } from '@/types/types'
import { toast } from 'sonner'

export default function ResendEmailVerification({ token }: TokenProps) {
	const router = useRouter()

	async function handleResendEmail() {
		toast.dismiss()
		try {
			await api.post('/auth/verify/email/request', {
				token: token,
			})

			toast.success('Successfully registered')
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : 'An unexpected error occurred'
			toast.error(errorMessage)
		}
	}

	async function handleLogout() {
		toast.dismiss()
		try {
			await fetch('/api/logout', {
				method: 'POST',
			})

			router.push('/')
			toast.success('Successfully logged out')
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : 'An unexpected error occurred'
			toast.error(errorMessage)
		}
	}

	return (
		<>
			<div className="text-center">
				<button
					onClick={handleResendEmail}
					className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
				>
					Resend Verification Email
				</button>
			</div>
			<div className="text-center">
				<button
					onClick={handleLogout}
					className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
				>
					Logout
				</button>
			</div>
		</>
	)
}
