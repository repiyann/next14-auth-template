'use server'

import { Home } from 'lucide-react'
import { cookies } from 'next/headers'
import api from '@/lib/api'
import { UserNav } from './user-nav'

export async function Navbar() {
	const token = cookies().get('session')?.value
	const { data } = await api.get('/auth/profile', {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})

	return (
		<nav className="border-b">
			<div className="flex h-16 items-center px-4">
				<a href="/" className="flex items-center font-semibold">
					<Home className="mr-2 h-6 w-6" />
					<span>Home</span>
				</a>
				<div className="ml-auto flex items-center space-x-4">
					<UserNav user={data} />
				</div>
			</div>
		</nav>
	)
}
