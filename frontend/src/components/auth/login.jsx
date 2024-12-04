import { useState } from 'react';
import axiosInstance from '../../client/axios'; // Make sure you have axiosInstance set up
import { Link, useNavigate } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await axiosInstance.post('/auth/login', {
        email,
        password,
      });

// console.log(response);

      if (response.status === 201) {
       
        localStorage.setItem('token', response.data.token);
        setLoading(false);
        navigate('/dashboard')  
      }
    } catch (err) {
      setLoading(false);
      if (err.response) {
        setError(err.response.data.message || 'Login failed');
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-[url('./assets/images/event.jpg')]">
      <div className="w-full max-w-md bg-white/30 backdrop-blur-md rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-black mb-6">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-black">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 border border-black rounded-lg focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-black">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 border border-black rounded-lg focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
            disabled={loading}  
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="text-sm text-center text-black mt-4">
          Don't have an account?{' '}
          <Link to="/register" className="text-red-500 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
