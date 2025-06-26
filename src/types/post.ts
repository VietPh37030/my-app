export interface Post {
  id: string
  title: string
  description: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

export interface CreatePostRequest {
  title: string
  description: string
  tags: string[]
}

export interface UpdatePostRequest {
  title?: string
  description?: string
  tags?: string[]
}

export interface PostsResponse {
  data: Post[]
  total: number
  page: number
  limit: number
}
