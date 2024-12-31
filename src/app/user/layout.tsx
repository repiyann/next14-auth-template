import { Navbar } from '@/components/organism/navbar'

export default function UserLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className="min-h-screen flex flex-col">
			<Navbar />
			{children}
		</div>
	)
}
