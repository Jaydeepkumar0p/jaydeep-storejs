/* eslint-disable no-irregular-whitespace */
import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../../zustand/authStore'
import { User, Mail, Key, Save, Clock, Loader2 } from 'lucide-react'; // Importing Lucide icons

const Profile = () => {
  const { user, updateProfile, isUpdatingProfile } = useAuthStore()
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  })

  useEffect(() => {
    if (user) {
      setUserData({
        username: user.username || '',
        email: user.email || '',
        password: '',
      })
    }
  }, [user])

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await updateProfile(userData)
  }

  return (
    // 1. Background (Consistent Gradient)
    <div className="min-h-screen bg-gradient-to-br from-black via-orange-950 to-black flex items-center justify-center p-6 md:p-12 lg:p-20">
      <div className="max-w-4xl w-full flex flex-col md:flex-row gap-8">
        
        {/* 2. Left: Profile Overview Card (Consistent Card Style) */}
        <div className="bg-gradient-to-br from-orange-900/20 to-black/40 backdrop-blur-sm 
                        rounded-2xl p-8 border border-orange-500/30 w-full md:w-1/3 text-center
                        hover:border-orange-500/60 transition-all duration-300 
                        shadow-2xl shadow-orange-900/50">
          
          {/* Avatar */}
          <img
            src={user?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + user?.username}
            alt="Profile Avatar"
            className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-orange-500 shadow-xl shadow-orange-500/30"
          />
          
          {/* User Info */}
          <h2 className="text-3xl font-bold text-orange-400 mb-1 flex justify-center items-center">
            <User className="w-6 h-6 mr-2" /> {user?.username || "Guest User"}
          </h2>
          <p className="text-gray-400 text-sm mb-4">{user?.email || "No email provided"}</p>
          
          {/* Joined Date */}
          <div className="mt-4 border-t border-orange-900/50 pt-4">
            <div className="flex justify-center items-center text-gray-500 text-sm">
                <Clock className="w-4 h-4 mr-2" />
                Joined: 
                <span className='text-gray-300 font-medium ml-1'>
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                </span>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-gray-400 text-sm italic border border-dashed border-orange-600/50 p-3 rounded-lg">
              Enhance your cyber experience by keeping your profile updated. ✨
            </p>
          </div>
        </div>

        {/* 3. Right: Update Profile Form (Consistent Card Style) */}
        <div className="bg-gradient-to-br from-orange-900/20 to-black/40 backdrop-blur-sm 
                        p-8 rounded-2xl shadow-2xl w-full md:w-2/3 border border-orange-500/30 
                        hover:border-orange-500/60 transition-all duration-300 
                        shadow-orange-900/50">
          
          <h2 className="text-4xl font-bold text-center text-orange-500 mb-8 border-b border-orange-700/50 pb-4">
            Profile Configuration
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Username Field */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                <User className="w-4 h-4 mr-2 text-orange-400" /> Full Name
              </label>
              <input
                type="text"
                name="username"
                value={userData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                // 4. Input Styling (Consistent Cyber-Orange Focus)
                className="w-full px-4 py-3 rounded-lg bg-black/50 text-white border border-orange-800 
                            focus:ring-2 focus:ring-orange-500 focus:border-orange-500 
                            outline-none transition duration-200"
                disabled={isUpdatingProfile}
              />
            </div>

            {/* Email Field */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                <Mail className="w-4 h-4 mr-2 text-orange-400" /> Email Address
              </label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg bg-black/50 text-white border border-orange-800 
                            focus:ring-2 focus:ring-orange-500 focus:border-orange-500 
                            outline-none transition duration-200"
                disabled={isUpdatingProfile}
              />
            </div>

            {/* Password Field */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                <Key className="w-4 h-4 mr-2 text-orange-400" /> Password (Leave blank to keep current)
              </label>
              <input
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                placeholder="Enter new password"
                className="w-full px-4 py-3 text-gray-300 border border-orange-800 bg-black/50 
                            rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 
                            outline-none transition duration-200"
                disabled={isUpdatingProfile}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              // 5. Button Styling (Consistent Orange Gradient/Shadow)
              className="w-full bg-gradient-to-r from-orange-600 to-orange-500 text-black 
                          py-3 rounded-lg font-bold text-lg hover:from-orange-500 hover:to-orange-600 
                          transition duration-300 shadow-xl shadow-orange-500/40 
                          disabled:from-gray-600 disabled:to-gray-500 disabled:shadow-none 
                          flex items-center justify-center gap-2"
              disabled={isUpdatingProfile}
            >
              {isUpdatingProfile ? (
                <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Saving...
                </>
              ) : (
                <>
                    <Save className="w-5 h-5" /> Save Changes
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile