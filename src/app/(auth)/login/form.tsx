'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '@/schema/auth'
import api from '@/lib/api'
import { setSessionCookie } from '@/lib/auth'

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

export function LoginForm() {
	const router = useRouter()

	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	async function onSubmit(payload: z.infer<typeof loginSchema>) {
		toast.dismiss()
		try {
			const { data } = await api.post('/auth/login', payload)
			const { token, isAdmin } = data.token
			await setSessionCookie(token)

			form.reset()
			toast.success('Successfully logged in')
			router.push(isAdmin ? '/admin/dashboard' : '/user')
		} catch (error) {
			form.reset()

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
					<h1 className="text-2xl font-bold">Login to your account</h1>
					<p className="text-balance text-sm text-muted-foreground">
						Enter your email and password to log in.
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
										<Input placeholder="Enter email" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="grid gap-2">
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<div className="flex items-center">
										<FormLabel>Password</FormLabel>
										<Link
											href="/forgot-password"
											className="ml-auto text-sm underline-offset-4 hover:underline"
										>
											Forgot your password?
										</Link>
									</div>
									<FormControl>
										<Input
											type="password"
											placeholder="Enter password"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button type="submit" className="w-full">
						Login
					</Button>
				</div>
				<div className="text-center text-sm">
					Don&apos;t have an account?{' '}
					<a href="/register" className="underline underline-offset-4">
						Sign up
					</a>
				</div>
			</form>
		</Form>
	)
}
