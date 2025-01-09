import { AppSidebar } from '@/components/organism/app-sidebar'
import { UserNav } from '@/components/organism/user-nav'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from '@/components/ui/sidebar'
import { cookies } from 'next/headers'
import api from '@/lib/api'

export default async function AdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const token = cookies().get('session')?.value
	const { data } = await api.get('/auth/profile', {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})

	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
					<div className="flex items-center gap-2">
						<SidebarTrigger className="-ml-1" />
						<Separator orientation="vertical" className="mr-2 h-4" />
						<Breadcrumb>
							<BreadcrumbList>
								<BreadcrumbItem className="hidden md:block">
									<BreadcrumbLink href="#">
										Building Your Application
									</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator className="hidden md:block" />
								<BreadcrumbItem>
									<BreadcrumbPage>Data Fetching</BreadcrumbPage>
								</BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb>
					</div>
					<UserNav user={data} />
				</header>
				{children}
			</SidebarInset>
		</SidebarProvider>
	)
}
