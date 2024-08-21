import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">404</h1>
        <p className="text-lg text-gray-700 mb-4">Oops! The page you're looking for does not exist.</p>
        <Link to="/" className="text-orange-600 font-semibold hover:underline">Go back to Home</Link>
      </div>
    </div>
  )
}

export default NotFound