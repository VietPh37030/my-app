import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"

import ProtectedRoute from "./components/ProtectedRoute"
import "./App.css"
import { AuthProvider } from "./context/AuthContex"
import Layout from "./components/Layout/Layout"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import DashboardPage from "./pages/DashBoardPage"

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Trang chủ */}
            <Route
              path="/"
              element={
                <Layout>
                  <HomePage />
                </Layout>
              }
            />
            {/* Trang đăng nhập */}
            <Route path="/login" element={<LoginPage />} />
            {/* Trang dashboard (cần đăng nhập) */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Layout>
                    <DashboardPage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            {/* Redirect các route không tồn tại về trang chủ */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
