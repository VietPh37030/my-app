const API_BASE_URL = "https://api-test-web.agiletech.vn"

class ApiService {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem("accessToken")
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    }
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`
    const config: RequestInit = {
      headers: this.getAuthHeaders(),
      ...options,
    }

    console.log("🔄 Making request to:", url, "with config:", config)

    let response = await fetch(url, config)

    // Handle 401 Unauthorized - try refresh token
    if (response.status === 401) {
      console.log("🔑 Token expired, attempting refresh...")
      const refreshed = await this.refreshToken()

      if (refreshed) {
        console.log("✅ Token refreshed successfully, retrying request...")
        // Retry the original request with new token
        const retryConfig: RequestInit = {
          headers: this.getAuthHeaders(),
          ...options,
        }
        response = await fetch(url, retryConfig)
      } else {
        console.log("❌ Token refresh failed, redirecting to login...")
        localStorage.clear()
        window.location.href = "/login"
        throw new Error("Authentication failed - please login again")
      }
    }

    if (!response.ok) {
      const errorText = await response.text()
      console.error("❌ API Error:", response.status, errorText)
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
    }

    const data = await response.json()
    console.log("✅ Response data:", data)
    return data
  }

  async refreshToken(): Promise<boolean> {
    try {
      const refreshToken = localStorage.getItem("refreshToken")
      if (!refreshToken) {
        console.log("❌ No refresh token found")
        return false
      }

      console.log("🔄 Attempting to refresh token...")
      const response = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      })

      if (response.ok) {
        const data = await response.json()
        console.log("✅ Token refresh successful:", data)

        // Update tokens
        if (data.accessToken) {
          localStorage.setItem("accessToken", data.accessToken)
        }
        if (data.refreshToken) {
          localStorage.setItem("refreshToken", data.refreshToken)
        }
        return true
      } else {
        const errorText = await response.text()
        console.log("❌ Token refresh failed:", response.status, errorText)
        return false
      }
    } catch (error) {
      console.error("❌ Token refresh error:", error)
      return false
    }
  }

  // Auth endpoints
  async login(username: string) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    })

    if (!response.ok) {
      throw new Error("Login failed")
    }

    const data = await response.json()
    console.log("Login response:", data)
    return data
  }

  async logout() {
    return this.request("/auth/logout", { method: "DELETE" })
  }

  // Posts endpoints
  async getPosts(page = 1, title = "", tags = "") {
    const params = new URLSearchParams()
    if (page > 1) params.append("page", page.toString())
    if (title) params.append("title", title)
    if (tags && tags !== "all") params.append("tags", tags)

    const endpoint = `/posts${params.toString() ? `?${params.toString()}` : ""}`
    console.log("Fetching posts from:", endpoint)

    return this.request<any>(endpoint)
  }

  async createPost(data: { title: string; description: string; tags: string[] }) {
    console.log("📝 Creating post:", data)
    return this.request<any>("/posts", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async updatePost(id: string, data: { title: string; description: string; tags: string[] }) {
    console.log("✏️ Updating post:", id, data)
    return this.request<any>(`/posts/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    })
  }

  async deletePost(id: string) {
    console.log("🗑️ Deleting post:", id)
    const response = await this.request(`/posts/${id}`, { method: "DELETE" })
    console.log("🗑️ Delete response:", response)
    return response
  }

  async getPost(id: string) {
    console.log("📖 Getting post:", id)
    return this.request<any>(`/posts/${id}`)
  }

  async getTags() {
    return this.request<string[]>("/posts/tags")
  }

  async getGalleries() {
    return this.request<any[]>("/galleries")
  }
}

export const apiService = new ApiService()
