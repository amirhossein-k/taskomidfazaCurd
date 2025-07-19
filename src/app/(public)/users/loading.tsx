// src\app\users\loading.tsx
const LoadingUser = () => {
  return (
    <div className="container mx-auto p-4">
      <p className="text-center text-gray-600 mb-4">لطفا کمی صبر کنید...</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse border p-4 rounded-lg shadow bg-gray-100 flex flex-col"
          >
            <div className="h-48 bg-gray-300 rounded mb-4" />
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-300 rounded w-1/2" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default LoadingUser
