'use client'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { User, Settings, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { ProfileProps } from '@/types/types'

export function UserNav({ user }: { user: ProfileProps }) {
	const router = useRouter()

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
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="relative h-8 w-8 rounded-full">
					<User className="h-5 w-5" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end" forceMount>
				<DropdownMenuLabel className="font-normal">
					<div className="flex flex-col space-y-1">
						<p className="text-sm font-medium leading-none">{user.fullName}</p>
						<p className="text-xs leading-none text-muted-foreground">
							{user.email}
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<a href="/user/profile">
						<Settings className="mr-2 h-4 w-4" />
						<span>Settings</span>
					</a>
				</DropdownMenuItem>
				<DropdownMenuItem onClick={handleLogout}>
					<LogOut className="mr-2 h-4 w-4" />
					<span>Log out</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
