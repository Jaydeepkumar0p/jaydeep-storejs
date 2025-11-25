import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../zustand/authStore';
import { Eye, EyeOff, Lock, Mail, Loader2, User, Zap, ArrowRight, Shield, Sparkles } from 'lucide-react';

const SignUp = () => {
  const [formdata, setFormdata] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { isSigningUp, signup, user } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password, confirmPassword } = formdata;

    if (!username || !email || !password || !confirmPassword) {
      console.error("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    await signup({ username, email, password });
  };

  useEffect(() => {
    if (user) navigate(location.state?.from || '/');
  }, [user, navigate, location]);

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-orange-950 to-black p-4 sm:p-6 lg:p-8'>
      
      {/* Main SignUp Container */}
      <div className='w-full max-w-md animate-fade-in-up'>
        
        {/* Header Section */}
        <div className='text-center mb-8 animate-slide-down'>
          <div className='flex justify-center mb-4'>
            <div className='p-4 bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-2xl border border-orange-500/30 relative'>
              <Sparkles className='w-8 h-8 text-orange-400' />
              <div className='absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full animate-pulse'></div>
            </div>
          </div>
          <h1 className='text-4xl font-black text-orange-500 mb-2 tracking-tight'>
            Join The Network
          </h1>
          <div className='h-1.5 w-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mx-auto mb-4'></div>
          <p className='text-gray-400 text-lg'>
            Create your account to get started
          </p>
        </div>

        {/* SignUp Card */}
        <div className='bg-gradient-to-br from-orange-900/20 to-black/40 backdrop-blur-lg rounded-3xl border-2 border-orange-500/30 p-8 hover:border-orange-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/20'>
          
          <form onSubmit={handleSubmit} className='space-y-6'>

            {/* Username Input */}
            <div className='group'>
              <div className='relative'>
                <div className='absolute inset-0 bg-gradient-to-r from-orange-500/10 to-orange-600/5 rounded-xl blur-sm group-hover:blur transition-all duration-300'></div>
                <div className='relative'>
                  <User className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-400 group-hover:text-orange-300 transition-colors duration-300' />
                  <input
                    id='username'
                    type='text'
                    name='username'
                    placeholder='Choose a username'
                    value={formdata.username}
                    onChange={handleChange}
                    className='w-full pl-12 pr-4 py-4 rounded-xl 
                      bg-gradient-to-br from-orange-900/30 to-black/50 
                      backdrop-blur-lg text-gray-200 placeholder-gray-400
                      border border-orange-500/40 focus:border-orange-500/80
                      focus:outline-none focus:ring-2 focus:ring-orange-500/30 
                      transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20
                      font-medium disabled:opacity-50 disabled:cursor-not-allowed'
                    disabled={isSigningUp}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Email Input */}
            <div className='group'>
              <div className='relative'>
                <div className='absolute inset-0 bg-gradient-to-r from-orange-500/10 to-orange-600/5 rounded-xl blur-sm group-hover:blur transition-all duration-300'></div>
                <div className='relative'>
                  <Mail className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-400 group-hover:text-orange-300 transition-colors duration-300' />
                  <input
                    id='email'
                    type='email'
                    name='email'
                    placeholder='Enter your email'
                    value={formdata.email}
                    onChange={handleChange}
                    className='w-full pl-12 pr-4 py-4 rounded-xl 
                      bg-gradient-to-br from-orange-900/30 to-black/50 
                      backdrop-blur-lg text-gray-200 placeholder-gray-400
                      border border-orange-500/40 focus:border-orange-500/80
                      focus:outline-none focus:ring-2 focus:ring-orange-500/30 
                      transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20
                      font-medium disabled:opacity-50 disabled:cursor-not-allowed'
                    disabled={isSigningUp}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Password Input */}
            <div className='group'>
              <div className='relative'>
                <div className='absolute inset-0 bg-gradient-to-r from-orange-500/10 to-orange-600/5 rounded-xl blur-sm group-hover:blur transition-all duration-300'></div>
                <div className='relative'>
                  <Lock className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-400 group-hover:text-orange-300 transition-colors duration-300' />
                  <input
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    name='password'
                    placeholder='Create password'
                    value={formdata.password}
                    onChange={handleChange}
                    className='w-full pl-12 pr-12 py-4 rounded-xl 
                      bg-gradient-to-br from-orange-900/30 to-black/50 
                      backdrop-blur-lg text-gray-200 placeholder-gray-400
                      border border-orange-500/40 focus:border-orange-500/80
                      focus:outline-none focus:ring-2 focus:ring-orange-500/30 
                      transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20
                      font-medium disabled:opacity-50 disabled:cursor-not-allowed'
                    disabled={isSigningUp}
                    required
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-4 top-1/2 transform -translate-y-1/2 text-orange-400 hover:text-orange-300 p-1 rounded-lg transition-all duration-300 hover:scale-110 group/eye'
                    disabled={isSigningUp}
                  >
                    {showPassword ? 
                      <EyeOff className='w-5 h-5 group-hover/eye:scale-110 transition-transform duration-300' /> : 
                      <Eye className='w-5 h-5 group-hover/eye:scale-110 transition-transform duration-300' />
                    }
                  </button>
                </div>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div className='group'>
              <div className='relative'>
                <div className='absolute inset-0 bg-gradient-to-r from-orange-500/10 to-orange-600/5 rounded-xl blur-sm group-hover:blur transition-all duration-300'></div>
                <div className='relative'>
                  <Lock className='absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-400 group-hover:text-orange-300 transition-colors duration-300' />
                  <input
                    id='confirmPassword'
                    type={showConfirmPassword ? 'text' : 'password'}
                    name='confirmPassword'
                    placeholder='Confirm password'
                    value={formdata.confirmPassword}
                    onChange={handleChange}
                    className='w-full pl-12 pr-12 py-4 rounded-xl 
                      bg-gradient-to-br from-orange-900/30 to-black/50 
                      backdrop-blur-lg text-gray-200 placeholder-gray-400
                      border border-orange-500/40 focus:border-orange-500/80
                      focus:outline-none focus:ring-2 focus:ring-orange-500/30 
                      transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20
                      font-medium disabled:opacity-50 disabled:cursor-not-allowed'
                    disabled={isSigningUp}
                    required
                  />
                  <button
                    type='button'
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className='absolute right-4 top-1/2 transform -translate-y-1/2 text-orange-400 hover:text-orange-300 p-1 rounded-lg transition-all duration-300 hover:scale-110 group/eye'
                    disabled={isSigningUp}
                  >
                    {showConfirmPassword ? 
                      <EyeOff className='w-5 h-5 group-hover/eye:scale-110 transition-transform duration-300' /> : 
                      <Eye className='w-5 h-5 group-hover/eye:scale-110 transition-transform duration-300' />
                    }
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              className='group relative w-full px-8 py-4 text-lg font-black text-black bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-105 border border-orange-300/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
              disabled={isSigningUp}
            >
              <span className='absolute inset-0 bg-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></span>
              <span className='relative flex items-center justify-center gap-3'>
                {isSigningUp ? (
                  <>
                    <Loader2 className='w-5 h-5 animate-spin' />
                    Creating Account...
                  </>
                ) : (
                  <>
                    <Zap className='w-5 h-5' />
                    Activate Account
                    <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform duration-300' />
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Login Redirect */}
          <div className='mt-8 pt-6 border-t border-orange-500/20'>
            <p className='text-center text-gray-400'>
              Already part of the network?{' '}
              <Link
                to='/login'
                className='group font-bold text-orange-400 hover:text-orange-300 transition-all duration-300 inline-flex items-center gap-1'
              >
                Access System
                <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform duration-300' />
              </Link>
            </p>
          </div>
        </div>

        {/* Security Note */}
        <div className='mt-6 text-center'>
          <p className='text-xs text-gray-500 flex items-center justify-center gap-1'>
            <Shield className='w-3 h-3' />
            All data is encrypted and securely stored
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;