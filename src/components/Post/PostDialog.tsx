import type React from "react"
import { useState, useEffect } from "react"
import { Dialog } from "../UI/Dialog"
import { Button } from "../UI/Button"

interface Post {
  id: string
  title: string
  description: string
  tags: string[]
  createdAt: string
}

interface PostDialogProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: { title: string; description: string; tags: string[] }) => void
  post?: Post | null
  mode: "add" | "edit"
}

const PostDialog: React.FC<PostDialogProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  post, 
  mode 
}) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (mode === "edit" && post) {
      setTitle(post.title)
      setDescription(post.description)
      setTags(post.tags.join(", "))
    } else {
      setTitle("")
      setDescription("")
      setTags("")
    }
  }, [mode, post, isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim() || !description.trim()) {
      alert("Please fill in all required fields")
      return
    }

    setLoading(true)
    
    try {
      const tagsArray = tags
        .split(",")
        .map(tag => tag.trim())
        .filter(tag => tag)

      await onSave({
        title: title.trim(),
        description: description.trim(),
        tags: tagsArray
      })
      
      onClose()
    } catch (error) {
      console.error("Error saving post:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    if (!loading) {
      onClose()
    }
  }

  return (
    <Dialog
      isOpen={isOpen}
      onClose={handleClose}
      title={mode === "add" ? "Add New Post" : "Edit Post"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Title *
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            placeholder="Enter post title"
            disabled={loading}
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            placeholder="Enter post description"
            disabled={loading}
            required
          />
        </div>

        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
            Tags
          </label>
          <input
            id="tags"
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            placeholder="Enter tags separated by commas (e.g., react, javascript, web)"
            disabled={loading}
          />
          <p className="text-xs text-gray-500 mt-1">
            Separate multiple tags with commas
          </p>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            {loading ? "Saving..." : mode === "add" ? "Add Post" : "Update Post"}
          </Button>
        </div>
      </form>
    </Dialog>
  )
}

export default PostDialog
