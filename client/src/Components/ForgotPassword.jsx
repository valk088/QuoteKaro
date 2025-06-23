import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth'; // Import the specific function
 import { auth } from '../../firebase'; // Your Firebase auth instance
import { Link } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    try {
      
      const actionCodeSettings = {
        url: 'http://localhost:5173/reset-password', // This must be a URL in your app's authorized domains in Firebase Console
        handleCodeInApp: true, // This is crucial for handling in your app
      };
      
      await sendPasswordResetEmail(auth, email,actionCodeSettings);
      setMessage('Password reset email sent! Check your inbox.');
      setEmail(''); // Clear the email field
    } catch (err) {
      console.error('Error sending password reset email:', err.code, err.message);
      switch (err.code) {
        case 'auth/invalid-email':
          setError('Please enter a valid email address.');
          break;
        case 'auth/user-not-found':
          setError('No user found with that email. Please check your spelling.');
          break;
        case 'auth/missing-email':
          setError('Please enter your email address.');
          break;
        default:
          setError('Failed to send reset email. Please try again later.');
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Forgot Password</h2>
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="you@example.com"
              required
            />
          </div>
          {message && <p className="text-green-600 text-sm">{message}</p>}
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Sending...' : 'Send Reset Email'}
          </button>
        </form>
        <div className="mt-6 text-center">
          <Link to="/login" className="text-sm text-purple-600 hover:underline">
            Remembered your password? Log In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;