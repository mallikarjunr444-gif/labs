import React, { useState } from 'react';
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const AuthModal = ({ onClose }: { onClose: () => void }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      onClose();
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleEmailPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      onClose();
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{isLogin ? 'Login' : 'Sign Up'}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">&times;</button>
        </div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="flex border-b mb-6">
          <button onClick={() => setIsLogin(true)} className={`w-1/2 py-2 font-semibold ${isLogin ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500'}`}>Login</button>
          <button onClick={() => setIsLogin(false)} className={`w-1/2 py-2 font-semibold ${!isLogin ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500'}`}>Sign Up</button>
        </div>

        <form onSubmit={handleEmailPasswordSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 font-semibold">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <div>
          <button onClick={handleGoogleSignIn} className="w-full flex items-center justify-center gap-2 border rounded-md py-2 px-4 hover:bg-gray-50 font-semibold">
            <svg className="w-5 h-5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 381.5 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126.9 26.8 170.2 68.8l-79.3 79.3c-33.4-31.8-78.7-51.7-129.9-51.7-97.2 0-176.4 79.2-176.4 176.4s79.2 176.4 176.4 176.4c70.8 0 131.3-41.5 158.2-101.9H248V261.8h239.2c.8 8.6 1.8 17.2 1.8 26z"></path></svg>
            Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
