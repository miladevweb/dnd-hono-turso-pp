import { Post } from '@/types/types'
import axios, { AxiosResponse } from 'axios'

const api = axios.create({
  baseURL: 'http://127.0.0.1:8787',
})

export const getPosts = (userId: number): Promise<AxiosResponse<Post[]>> => api.get(`/posts?user_id=${userId}`)
