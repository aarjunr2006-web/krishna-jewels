import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { User, Lock, CheckCircle2 } from 'lucide-react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && password.trim()) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate('/');
      }, 1500);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 text-left bg-kj-ivory">
      <div className="border border-kj-gold/15 bg-white p-6 md:p-8 shadow-xs">
        
        {success ? (
          <div className="flex flex-col items-center justify-center py-10 text-center text-kj-emerald font-sans text-sm gap-2">
            <CheckCircle2 size={36} />
            <p className="font-bold uppercase tracking-wider">Welcome Back!</p>
            <p className="text-xs text-gray-500 font-light">Redirecting to storefront homepage...</p>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div className="text-center">
              <h1 className="font-serif text-2xl md:text-3xl font-bold text-kj-maroon uppercase tracking-wide">
                Account Sign In
              </h1>
              <p className="font-sans text-xs text-gray-400 mt-1 uppercase tracking-widest">
                Access your orders and wishlist.
              </p>
              <div className="w-12 h-[1px] bg-kj-gold mx-auto mt-3"></div>
            </div>

            <div className="flex flex-col gap-1 mt-2">
              <label className="font-sans text-[11px] uppercase tracking-wider font-semibold text-gray-500 flex items-center gap-1.5">
                <User size={12} className="text-kj-gold" /> Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="bg-white border border-kj-gold/30 px-3 py-2.5 text-sm focus:outline-none focus:border-kj-maroon font-sans"
              />
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <label className="font-sans text-[11px] uppercase tracking-wider font-semibold text-gray-500 flex items-center gap-1.5">
                  <Lock size={12} className="text-kj-gold" /> Password
                </label>
                <a href="#" className="font-sans text-[11px] text-kj-maroon hover:underline">
                  Forgot Password?
                </a>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-white border border-kj-gold/30 px-3 py-2.5 text-sm focus:outline-none focus:border-kj-maroon font-sans"
              />
            </div>

            <Button type="submit" variant="primary" className="w-full py-3.5 mt-2 font-semibold tracking-widest">
              Sign In
            </Button>

            <p className="font-sans text-xs text-center text-gray-500 mt-2">
              New to Krishna Jewellers?{' '}
              <Link to="/account/register" className="text-kj-maroon hover:underline font-semibold">
                Create Account
              </Link>
            </p>
          </form>
        )}

      </div>
    </div>
  );
};
export default Login;
