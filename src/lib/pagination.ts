import { ResponsePaginated } from '@/types/types'
import api from './api'

export async function getPaginationData<T>(
  url: string,
  options: {
    page?: number
  }
): Promise<ResponsePaginated<T>> {
  const queryParams: string[] = []

  if (options.page !== undefined || options.page !== null) {
    queryParams.push(`page=${options.page}`)
  }

  if (queryParams.length > 0) {
    url += `?${queryParams.join('&')}`
  }
  const response = await api.get(url)

  return response.data
}
