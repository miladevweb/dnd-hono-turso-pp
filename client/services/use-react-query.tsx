import { Post } from '@/types/types'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { getPosts } from './axios'

export const useReactQuery = () => {
  const [posts, setPosts] = useState<Post[]>([])

  const { data, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: () => getPosts(2),
  })
  useEffect(() => {
    if (data) setPosts(data.data)
  }, [data])

  return { posts, setPosts, isLoading }
}
