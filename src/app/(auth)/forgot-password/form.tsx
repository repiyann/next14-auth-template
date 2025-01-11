'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { forgotSchema } from '@/schema/auth'
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

export default function ForgotPasswordForm() {
	const form = useForm<z.infer<typeof forgotSchema>>({
		resolver: zodResolver(forgotSchema),
		defaultValues: {
			email: '',
		},
	})

	async function onSubmit(payload: z.infer<typeof forgotSchema>) {
		toast.dismiss()
		try {
			await api.post('/auth/password/forgot', payload)

			toast.success('Password reset link sent successfully to your email')
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
						Enter your email address, and we&apos;ll send you a link to reset
						your password.
					</p>
				</div>
				<div className="grid gap-6">
					<div className="grid gap-2">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder="Enter your email" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button type="submit" className="w-full">
						Send Reset Link
					</Button>
				</div>
			</form>
		</Form>
	)
}
