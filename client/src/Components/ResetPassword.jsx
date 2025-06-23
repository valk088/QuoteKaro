import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { checkActionCode, confirmPasswordReset, applyActionCode } from 'firebase/auth'; // Import specific functions
import { auth } from '../../firebase'; // Your Firebase auth instance

function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [oobCode, setOobCode] = useState(null); // Out-of-band code from URL
  const [isValidCode, setIsValidCode] = useState(false); // To check if the code is valid

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('oobCode');

    if (code) {
      setOobCode(code);
      // Verify the password reset code
      checkActionCode(auth, code)
        .then(() => {
          setIsValidCode(true);
          setLoading(false);
          setMessage('Please enter your new password.');
        })
        .catch((err) => {
          console.error('Invalid or expired action code:', err);
          setError('The password reset link is invalid or has expired. Please request a new one.');
          setLoading(false);
        });
    } else {
      setError('No password reset code found. Please use the link from your email.');
      setLoading(false);
    }
  }, [location.search]);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }

    try {
      if (oobCode) {
        await confirmPasswordReset(auth, oobCode, newPassword);
        setMessage('Your password has been reset successfully! Redirecting to login...');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => {
          navigate('/login'); // Redirect to login page
        }, 3000);
      } else {
        setError('No reset code available.');
      }
    } catch (err) {
      console.error('Error resetting password:', err.code, err.message);
      switch (err.code) {
        case 'auth/expired-action-code':
          setError('The password reset link has expired. Please request a new one.');
          break;
        case 'auth/invalid-action-code':
          setError('The password reset link is invalid. Please request a new one.');
          break;
        case 'auth/user-disabled':
          setError('Your account has been disabled. Please contact support.');
          break;
        case 'auth/weak-password':
          setError('The password is too weak. Please choose a stronger password.');
          break;
        default:
          setError('Failed to reset password. Please try again.');
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-700">Verifying reset link...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Set New Password</h2>
        {!isValidCode && error ? (
          <p className="text-red-600 text-center">{error}</p>
        ) : (
          <form onSubmit={handlePasswordReset} className="space-y-4">
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter new password (min 6 characters)"
                required
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Confirm new password"
                required
              />
            </div>
            {message && <p className="text-green-600 text-sm">{message}</p>}
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading || !isValidCode}
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;