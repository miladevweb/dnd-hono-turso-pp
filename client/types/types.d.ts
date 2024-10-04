export type User = {
    id: number
    username: string
    created_at: Date
    posts: Post[]
  }
  export type Post = {
    id: number
    title: string
    user_id: number
    created_at: Date
  }