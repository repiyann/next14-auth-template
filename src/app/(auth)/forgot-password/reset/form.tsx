'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { resetPasswordSchema } from '@/schema/auth'
import api from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function ResetPasswordForm() {
	const router = useRouter()
	const token = localStorage.getItem('reset_token')
	if (!token) {
		router.push('/login')
	}

	const form = useForm<z.infer<typeof resetPasswordSchema>>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			password: '',
			password_confirmation: '',
		},
	})

	async function onSubmit(payload: z.infer<typeof resetPasswordSchema>) {
		toast.dismiss()
		try {
			const data = { ...payload, token }
			await api.post('/auth/password/reset', data)

			toast.success('Your password has been successfully reset.')
			localStorage.removeItem('reset_token')

			router.push('/login')
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : 'An unexpected error occurred'
			toast.error(errorMessage)
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-6"
			>
				<div className="flex flex-col items-center gap-2 text-center">
					<h1 className="text-2xl font-bold">Reset your password</h1>
					<p className="text-balance text-sm text-muted-foreground">
						Please enter your new password and confirm it.
					</p>
				</div>
				<div className="grid gap-6">
					<div className="grid gap-2">
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											type="password"
											placeholder="Enter your password"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="grid gap-2">
						<FormField
							control={form.control}
							name="password_confirmation"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password Confirmation</FormLabel>
									<FormControl>
										<Input
											type="password"
											placeholder="Confirm your password"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button type="submit" className="w-full">
						Reset Password
					</Button>
				</div>
			</form>
		</Form>
	)
}
