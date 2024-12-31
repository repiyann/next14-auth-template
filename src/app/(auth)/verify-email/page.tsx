import { cookies } from 'next/headers'
import ResendEmailVerification from './form'

export default async function VerifyEmailPage() {
	const sessionCookie = cookies().get('session');
  const token = sessionCookie ? sessionCookie.value : 'awawa';

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
				<h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
					Please Verify Your Email
				</h2>
				<p className="text-center text-gray-600 mb-6">
					A verification link has been sent to your email. Please check your
					inbox and verify your email address.
				</p>
				<ResendEmailVerification token={token} />
			</div>
		</div>
	)
}
