export interface SearchParams {
	[key: string]: string | string[] | undefined | number
}

interface Meta {
	total: number
	perPage: number
	currentPage: number
	lastPage: number
	firstPage: number
	firstPageUrl: string
	lastPageUrl: string
	nextPageUrl: string | null
	previousPageUrl: string | null
}

export interface ResponsePaginated<T> {
	meta: Meta
	data: T
}

export interface TokenProps {
	token: string
}

export interface ProfileProps {
	id: string
	fullName: string
	email: string
	isEmailVerified: boolean
	isAdmin: boolean
}

export interface VerificationCardProps {
	isAdmin?: boolean
	errorMessage?: string
}

export interface VerificationPasswordCardProps {
	token: string
	errorMessage?: string
}

interface User {
	id: string
	fullName: string
	email: string
	isEmailVerified: boolean
	isAdmin: boolean
}

export interface UsersTableProps {
	users: User[]
	token: string
}
