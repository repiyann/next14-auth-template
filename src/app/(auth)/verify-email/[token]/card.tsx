'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { VerificationCardProps } from '@/types/types'

export default function VerificationCard({
	isAdmin,
	errorMessage,
}: VerificationCardProps) {
	const [countdown, setCountdown] = useState<number>(5)
	const router = useRouter()

	function getStatus(
		isAdmin: boolean | undefined,
		countdown: number,
		errorMessage?: string
	) {
		if (errorMessage || isAdmin === undefined) return 'error'
		if (countdown === 0) return 'success'
		return 'loading'
	}

	const status = getStatus(isAdmin, countdown, errorMessage)

	useEffect(() => {
		if (isAdmin !== undefined && countdown > 0) {
			const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
			return () => clearTimeout(timer)
		} else if (isAdmin !== undefined && countdown === 0) {
			router.push(isAdmin ? '/admin/dashboard' : '/user')
		}
	}, [isAdmin, countdown, router])

	return (
		<Card className="w-[350px] h-[450px] flex flex-col">
			<CardHeader className="text-center">
				<CardTitle className="text-2xl mb-2">
					Verification{' '}
					{status === 'loading'
						? 'in Progress'
						: status === 'success'
						? 'Successful'
						: 'Failed'}
				</CardTitle>
				<CardDescription className="text-sm">
					{status === 'loading'
						? 'Please wait while we verify your account...'
						: status === 'success'
						? 'Your account has been successfully verified!'
						: 'We encountered an error while verifying your account.'}
				</CardDescription>
			</CardHeader>
			<CardContent className="flex-1 flex flex-col items-center justify-center">
				{status === 'loading' && (
					<div className="flex flex-col items-center">
						<div className="animate-spin">
							<Loader2 className="h-16 w-16 text-blue-500" />
						</div>
					</div>
				)}
				{status === 'success' && (
					<div className="flex flex-col items-center animate-scale-in">
						<CheckCircle2 className="h-16 w-16 text-green-500" />
						<p className="mt-4 text-lg font-semibold text-center">
							Redirecting in {countdown} seconds...
						</p>
					</div>
				)}
				{status === 'error' && (
					<div className="flex flex-col items-center animate-scale-in">
						<XCircle className="h-16 w-16 text-red-500" />
						<p className="mt-4 text-lg font-semibold text-center">
							Verification failed. Please try again.
						</p>
						<Button className="mt-4" onClick={() => router.push('/dashboard')}>
							Return to Dashboard
						</Button>
					</div>
				)}
			</CardContent>
		</Card>
	)
}
