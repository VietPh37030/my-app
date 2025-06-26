"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { apiService } from "../../services/api"
import { Button } from "../UI/Button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../UI/Table"
import { Edit, Trash2 } from "lucide-react"
import PostDialog from "./PostDialog"

interface Post {
  id: string
  title: string
  description: string
  tags: string[]
  createdAt: string
}

interface TagsResponse {
  data?: string[]
}

const PostsTable: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTitle, setSearchTitle] = useState("")
  const [selectedTags, setSelectedTags] = useState("all")
  const [availableTags, setAvailableTags] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogMode, setDialogMode] = useState<"add" | "edit">("add")
  const [editingPost, setEditingPost] = useState<Post | null>(null)

  useEffect(() => {
    console.log("PostsTable mounted, fetching initial data...")
    fetchPosts(currentPage, searchTitle, selectedTags)
    fetchTags()
  }, [])

  const fetchPosts = async (page = 1, title = "", tags = "") => {
    try {
      setLoading(true)
      console.log("🔄 Fetching posts with params:", { page, title, tags })

      const response = await apiService.getPosts(page, title, tags)
      console.log("📦 API Response:", response)

      let postsData: Post[] = []

      // Handle different response formats
      if (Array.isArray(response)) {
        postsData = response
      } else if (response && response.data && Array.isArray(response.data)) {
        postsData = response.data
      } else if (response && response.posts && Array.isArray(response.posts)) {
        postsData = response.posts
      } else if (response && response.items && Array.isArray(response.items)) {
        postsData = response.items
      } else {
        console.warn("⚠️ Unexpected response format:", response)
        postsData = []
      }

      // Transform data to match our Post interface
      const transformedPosts: Post[] = postsData.map((post: any, index: number) => ({
        id: post.id || post._id || (index + 1).toString(),
        title: post.title || "Untitled",
        description: post.description || post.content || "No description",
        tags: Array.isArray(post.tags) ? post.tags :
              typeof post.tags === 'string' ? post.tags.split(',').map((t: string) => t.trim()) :
              post.categories ? (Array.isArray(post.categories) ? post.categories : [post.categories]) :
              [],
        createdAt: post.createdAt || post.created_at || post.date || new Date().toISOString()
      }))

      setPosts(transformedPosts)
      console.log("✅ Posts set successfully:", transformedPosts.length, "posts")
      setError("")

    } catch (err) {
      console.error("❌ Failed to fetch posts:", err)
      setError("Failed to fetch posts: " + (err as Error).message)

      // Fallback to mock data if API fails
      const mockPosts: Post[] = [
        {
          id: "1",
          title: "Sample Post 1 (API Failed)",
          description: "This is fallback data when API is not available.",
          tags: ["fallback", "demo"],
          createdAt: "2024-01-15"
        },
        {
          id: "2",
          title: "Sample Post 2 (API Failed)",
          description: "Another fallback post to show table functionality.",
          tags: ["fallback", "test"],
          createdAt: "2024-01-10"
        }
      ]
      setPosts(mockPosts)
      console.log("🔄 Using fallback data:", mockPosts.length, "posts")
    } finally {
      setLoading(false)
    }
  }

  const fetchTags = async () => {
    try {
      const tags = await apiService.getTags()
      console.log("🏷️ Tags response:", tags)

      if (Array.isArray(tags)) {
        setAvailableTags(tags)
      } else if (tags && typeof tags === 'object' && 'data' in tags && Array.isArray((tags as TagsResponse).data)) {
        setAvailableTags((tags as TagsResponse).data!)
      } else {
        console.warn("⚠️ Unexpected tags format:", tags)
        setAvailableTags([])
      }
    } catch (err) {
      console.error("❌ Failed to fetch tags:", err)
      // Fallback tags
      setAvailableTags(["react", "javascript", "typescript", "css", "html", "nodejs", "python", "design"])
    }
  }

  useEffect(() => {
    fetchPosts(currentPage, searchTitle, selectedTags)
    fetchTags()
  }, [currentPage])

  // Load data on component mount
  useEffect(() => {
    fetchPosts(1, "", "")
    fetchTags()
  }, [])

  const handleSearch = () => {
    setCurrentPage(1)
    fetchPosts(1, searchTitle, selectedTags)
  }

  const handleDelete = async (id: string) => {
    // Find the post to show its title in confirmation
    const post = posts.find(p => p.id === id)
    const postTitle = post ? post.title : "this post"

    if (!window.confirm(`Are you sure you want to delete "${postTitle}"?`)) return

    try {
      console.log("🗑️ Attempting to delete post:", id)
      const result = await apiService.deletePost(id)
      console.log("✅ Delete result:", result)

      // Refresh the posts list
      await fetchPosts(currentPage, searchTitle, selectedTags)

      // Show success message
      setError("")
      console.log("✅ Post deleted and list refreshed")
    } catch (err) {
      console.error("❌ Failed to delete post:", err)
      const errorMessage = (err as Error).message
      setError("Failed to delete post: " + errorMessage)

      // Show error alert
      alert("Failed to delete post: " + errorMessage)
    }
  }

  const handleEdit = (post: Post) => {
    setEditingPost(post)
    setDialogMode("edit")
    setDialogOpen(true)
  }



  const handleAdd = () => {
    setEditingPost(null)
    setDialogMode("add")
    setDialogOpen(true)
  }

  const handleDialogSave = async (data: { title: string; description: string; tags: string[] }) => {
    try {
      if (dialogMode === "add") {
        console.log("📝 Attempting to create post:", data)
        await apiService.createPost(data)
        console.log("✅ Post created successfully")
        alert("Post created successfully!")
      } else if (dialogMode === "edit" && editingPost) {
        console.log("✏️ Attempting to update post:", editingPost.id, data)
        await apiService.updatePost(editingPost.id, data)
        console.log("✅ Post updated successfully")
        alert("Post updated successfully!")
      }

      // Refresh the posts list
      await fetchPosts(currentPage, searchTitle, selectedTags)

      // Clear error
      setError("")
    } catch (err) {
      console.error("❌ Failed to save post:", err)
      const errorMessage = (err as Error).message
      setError("Failed to save post: " + errorMessage)
      throw err // Re-throw to let dialog handle it
    }
  }



  return (
    <div className="p-6 bg-gray-200 min-h-screen">
      {/* Token Expiration Warning */}
      <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-800">
          <strong>Note:</strong> If you're using adminRefresh accounts, tokens will expire after 2 minutes.
          The system will automatically refresh tokens when needed.
        </p>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <Button
          onClick={handleAdd}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"
        >
          Add new
        </Button>

        <div className="flex gap-4">
          <input
            placeholder="Title"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-64 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />

          <select
            value={selectedTags}
            onChange={(e) => setSelectedTags(e.target.value)}
            className="w-48 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="">Tags</option>
            {availableTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-200">
              <TableHead className="font-semibold text-gray-900 border-r border-gray-300">ID</TableHead>
              <TableHead className="font-semibold text-gray-900 border-r border-gray-300">Title</TableHead>
              <TableHead className="font-semibold text-gray-900 border-r border-gray-300">Description</TableHead>
              <TableHead className="font-semibold text-gray-900 border-r border-gray-300">Tags</TableHead>
              <TableHead className="font-semibold text-gray-900">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <td colSpan={5} className="text-center py-8">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600 mx-auto"></div>
                </td>
              </TableRow>
            ) : posts.length === 0 && !loading ? (
              <TableRow>
                <td colSpan={5} className="text-center py-8">
                  <div className="text-gray-500">
                    <p>No posts found</p>
                    <p className="text-xs mt-2">Debug: Check browser console for API responses</p>
                  </div>
                </td>
              </TableRow>
            ) : (
              posts.map((post, index) => (
                <TableRow key={post.id || index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <TableCell className="border-r border-gray-300">{post.id || index + 1}</TableCell>
                  <TableCell className="border-r border-gray-300">{post.title || "No title"}</TableCell>
                  <TableCell className="border-r border-gray-300">{post.description || "No description"}</TableCell>
                  <TableCell className="border-r border-gray-300">
                    {Array.isArray(post.tags) ? post.tags.join(", ") : post.tags || ""}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="p-1 text-blue-600 hover:text-blue-700"
                        onClick={() => handleEdit(post)}
                        title="Edit post"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="p-1 text-red-600 hover:text-red-700"
                        onClick={() => handleDelete(post.id)}
                        title="Delete post"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end mt-4">
        <Button variant="outline" className="bg-gray-200 text-gray-700">
          Phân phân trang
        </Button>
      </div>

      {error && <div className="mt-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded">{error}</div>}

      {/* Post Dialog */}
      <PostDialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleDialogSave}
        post={editingPost}
        mode={dialogMode}
      />
    </div>
  )
}

export default PostsTable
