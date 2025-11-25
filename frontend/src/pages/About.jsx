import React from 'react'
import { ShoppingBag, Code2, User, ExternalLink } from 'lucide-react';

const About = () => {
  return (
     <div className="min-h-screen bg-gradient-to-br from-black via-orange-950 to-black">
      <section className="py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold text-orange-500 mb-4 animate-slide-down">
              About This Project
            </h1>
            <div className="h-1 w-32 bg-orange-500 mx-auto animate-expand"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="bg-gradient-to-br from-orange-900/20 to-black/40 backdrop-blur-sm rounded-2xl p-8 border border-orange-500/30 hover:border-orange-500/60 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/20 animate-slide-left">
              <div className="flex items-center mb-6">
                <ShoppingBag className="w-12 h-12 text-orange-500 mr-4" />
                <h2 className="text-3xl font-bold text-orange-400">MERN E-Commerce</h2>
              </div>
              <p className="text-gray-300 leading-relaxed text-lg">
                A full-stack e-commerce platform built with cutting-edge technologies.
                This project showcases modern web development practices, implementing
                a complete online shopping experience from browsing to checkout.
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-900/20 to-black/40 backdrop-blur-sm rounded-2xl p-8 border border-orange-500/30 hover:border-orange-500/60 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/20 animate-slide-right">
              <div className="flex items-center mb-6">
                <User className="w-12 h-12 text-orange-500 mr-4" />
                <h2 className="text-3xl font-bold text-orange-400">Developer</h2>
              </div>
              <p className="text-gray-300 leading-relaxed text-lg mb-4">
                Created by <span className="text-orange-500 font-semibold">Jaydeep Kumar</span>,
                a passionate student at Chandigarh University with a focus on building
                scalable and innovative web applications.
              </p>
              <a
                href="https://crm-port.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-orange-400 hover:text-orange-300 font-semibold transition-colors duration-300 group"
              >
                View Portfolio
                <ExternalLink className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </a>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-900/20 to-black/40 backdrop-blur-sm rounded-2xl p-8 border border-orange-500/30 animate-fade-in-up">
            <div className="flex items-center mb-8">
              <Code2 className="w-12 h-12 text-orange-500 mr-4" />
              <h2 className="text-3xl font-bold text-orange-400">Key Features</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4 group">
                <div className="w-3 h-3 bg-orange-500 rounded-full mt-2 group-hover:scale-150 transition-transform duration-300"></div>
                <div>
                  <h3 className="text-xl font-semibold text-orange-400 mb-2">User Authentication</h3>
                  <p className="text-gray-300">Secure login and registration with JWT tokens</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 group">
                <div className="w-3 h-3 bg-orange-500 rounded-full mt-2 group-hover:scale-150 transition-transform duration-300"></div>
                <div>
                  <h3 className="text-xl font-semibold text-orange-400 mb-2">Product Management</h3>
                  <p className="text-gray-300">Browse, search, and filter products seamlessly</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 group">
                <div className="w-3 h-3 bg-orange-500 rounded-full mt-2 group-hover:scale-150 transition-transform duration-300"></div>
                <div>
                  <h3 className="text-xl font-semibold text-orange-400 mb-2">Shopping Cart</h3>
                  <p className="text-gray-300">Dynamic cart with real-time updates</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 group">
                <div className="w-3 h-3 bg-orange-500 rounded-full mt-2 group-hover:scale-150 transition-transform duration-300"></div>
                <div>
                  <h3 className="text-xl font-semibold text-orange-400 mb-2">Payment Integration</h3>
                  <p className="text-gray-300">Secure checkout with multiple payment options</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 group">
                <div className="w-3 h-3 bg-orange-500 rounded-full mt-2 group-hover:scale-150 transition-transform duration-300"></div>
                <div>
                  <h3 className="text-xl font-semibold text-orange-400 mb-2">Order Tracking</h3>
                  <p className="text-gray-300">Real-time order status and history</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 group">
                <div className="w-3 h-3 bg-orange-500 rounded-full mt-2 group-hover:scale-150 transition-transform duration-300"></div>
                <div>
                  <h3 className="text-xl font-semibold text-orange-400 mb-2">Admin Dashboard</h3>
                  <p className="text-gray-300">Complete control over products, orders, and users</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 group">
                <div className="w-3 h-3 bg-orange-500 rounded-full mt-2 group-hover:scale-150 transition-transform duration-300"></div>
                <div>
                  <h3 className="text-xl font-semibold text-orange-400 mb-2">Responsive Design</h3>
                  <p className="text-gray-300">Optimized for all devices and screen sizes</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 group">
                <div className="w-3 h-3 bg-orange-500 rounded-full mt-2 group-hover:scale-150 transition-transform duration-300"></div>
                <div>
                  <h3 className="text-xl font-semibold text-orange-400 mb-2">RESTful API</h3>
                  <p className="text-gray-300">Clean and well-documented backend architecture</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="inline-block bg-gradient-to-r from-orange-600 to-orange-500 text-black font-bold py-4 px-8 rounded-full text-xl shadow-lg shadow-orange-500/50 animate-pulse-slow">
              Built with MongoDB, Express.js, React & Node.js
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
