import axios from 'axios'

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
})

api.interceptors.request.use(
	(config) => {
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

api.interceptors.response.use(
	(response) => {
		return response.data
	},
	(error) => {
		if (error.response && error.response.data) {
			return Promise.reject(new Error(error.response.data.message))
		} else {
			return Promise.reject(new Error(error.message || 'Interval Server Error'))
		}
	}
)

export default api
