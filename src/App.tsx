import React from 'react'

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Welcome to React + Tailwind CSS!
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Tailwind CSS đã được cài đặt thành công trong dự án của bạn.
        </p>
        <div className="flex justify-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
            Get Started
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
