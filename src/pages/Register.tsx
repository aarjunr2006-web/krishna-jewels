import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Lock, Mail, CheckCircle2 } from 'lucide-react';

export const Register: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (firstName.trim() && lastName.trim() && email.trim() && password.trim() && password === confirmPassword) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate('/account/login');
      }, 1500);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 text-left bg-kj-ivory">
      <div className="border border-kj-gold/15 bg-white p-6 md:p-8 shadow-xs">
        
        {success ? (
          <div className="flex flex-col items-center justify-center py-10 text-center text-kj-emerald font-sans text-sm gap-2">
            <CheckCircle2 size={36} />
            <p className="font-bold uppercase tracking-wider">Account Created!</p>
            <p className="text-xs text-gray-500 font-light">Redirecting to login portal...</p>
          </div>
        ) : (
          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <div className="text-center">
              <h1 className="font-serif text-2xl md:text-3xl font-bold text-kj-maroon uppercase tracking-wide">
                Create Account
              </h1>
              <p className="font-sans text-xs text-gray-400 mt-1 uppercase tracking-widest">
                Join our parivar for exclusive updates.
              </p>
              <div className="w-12 h-[1px] bg-kj-gold mx-auto mt-3 mb-2"></div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <label className="font-sans text-[10px] uppercase tracking-wider font-semibold text-gray-500">First Name</label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Rahul"
                  className="bg-white border border-kj-gold/30 px-3 py-2 text-sm focus:outline-none focus:border-kj-maroon font-sans"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-sans text-[10px] uppercase tracking-wider font-semibold text-gray-500">Last Name</label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Sharma"
                  className="bg-white border border-kj-gold/30 px-3 py-2 text-sm focus:outline-none focus:border-kj-maroon font-sans"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-sans text-[10px] uppercase tracking-wider font-semibold text-gray-500 flex items-center gap-1">
                <Mail size={11} className="text-kj-gold" /> Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="bg-white border border-kj-gold/30 px-3 py-2 text-sm focus:outline-none focus:border-kj-maroon font-sans"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-sans text-[10px] uppercase tracking-wider font-semibold text-gray-500 flex items-center gap-1">
                <Lock size={11} className="text-kj-gold" /> Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                className="bg-white border border-kj-gold/30 px-3 py-2 text-sm focus:outline-none focus:border-kj-maroon font-sans"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-sans text-[10px] uppercase tracking-wider font-semibold text-gray-500 flex items-center gap-1">
                <Lock size={11} className="text-kj-gold" /> Confirm Password
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                className="bg-white border border-kj-gold/30 px-3 py-2 text-sm focus:outline-none focus:border-kj-maroon font-sans"
              />
              {password && confirmPassword && password !== confirmPassword && (
                <span className="font-sans text-[10px] text-kj-rose mt-1">⚠️ Passwords do not match.</span>
              )}
            </div>

            <Button type="submit" variant="primary" className="w-full py-3.5 mt-2 font-semibold tracking-widest">
              Register Account
            </Button>

            <p className="font-sans text-xs text-center text-gray-500 mt-2">
              Already have an account?{' '}
              <Link to="/account/login" className="text-kj-maroon hover:underline font-semibold">
                Sign In
              </Link>
            </p>
          </form>
        )}

      </div>
    </div>
  );
};
export default Register;
