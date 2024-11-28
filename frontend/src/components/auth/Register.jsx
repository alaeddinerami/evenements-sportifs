import { useState } from 'react';

function Register() {
    const [name,setName]=useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    setSuccess(true);
    // Add registration logic here
    console.log('Email:', email, 'Password:', password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-[url('./assets/images/event.jpg')]">
      <div className="w-full max-w-md bg-white/30 backdrop-blur-md rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-black mb-6">Register</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">Registration successful! Please log in.</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="Name" className="block text-sm font-medium text-black">
              Name
            </label>
            <input
              type="name"
              id="name"
              name="name"
              placeholder="Enter your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 mt-1 border border-black rounded-lg focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>
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

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-black">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 border border-black rounded-lg focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
          >
            Register
          </button>
        </form>
        <p className="text-sm text-center text-black mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-red-500 hover:underline hover:text-red-700 font-bold">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
