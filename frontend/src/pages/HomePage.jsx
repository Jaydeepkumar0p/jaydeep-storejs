import { ShoppingBag, Zap, ArrowRight, Star, Truck, Lock } from 'lucide-react';
import { Link } from "react-router-dom";

const HomePage = () => {
  const products = [
    { id: 1, name: "Neon Backpack 'Apex'", price: "$89.99", image: "🎒" },
    { id: 2, name: "Tactical Gloves 'Cipher'", price: "$49.99", image: "🧤" },
    { id: 3, name: "Bio-Filter Mask 'Rogue'", price: "$39.99", image: "😷" },
    { id: 4, name: "Glow Headset 'Spectre'", price: "$129.99", image: "🎧" },
  ];

  const categories = [
    { name: 'Tech Gear', icon: '⚙️' },
    { name: 'Apparel', icon: '👕' },
    { name: 'Accessories', icon: '🎒' },
    { name: 'Limited Edition', icon: '✨' },
  ];

  const features = [
    { icon: Truck, title: 'Fast Shipping', desc: 'Delivery within 2-3 business days' },
    { icon: Lock, title: 'Secure Payment', desc: 'Protected transactions with SSL encryption' },
    { icon: Star, title: 'Premium Quality', desc: 'Handpicked gear for the elite' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-orange-950 to-black text-white overflow-hidden">
      {/* Navigation */}
      <nav className="relative z-50 py-6 px-4 md:px-8 lg:px-16 border-b border-orange-500/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3 group cursor-pointer animate-fade-in">
            <ShoppingBag className="w-8 h-8 text-orange-500 group-hover:rotate-12 transition-transform duration-300" />
            <h1 className="text-3xl font-bold text-orange-500 tracking-widest">CYBER-JUNGLE</h1>
          </div>
          <div className="flex space-x-8">
    <Link 
        to="/shop" 
        className="text-gray-300 hover:text-orange-400 transition-colors duration-300 font-medium"
      >Shop</Link>
            <Link to="about" className="text-gray-300 hover:text-orange-400 transition-colors duration-300 font-medium">About</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-16 md:py-32 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            {/* Left Content */}
            <div className="animate-slide-left">
              <h2 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
                Unleash the <span className="text-orange-500 block mt-2">Apex</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-lg">
                Premium, high-contrast gear for your digital life. Engineered for the future, designed for the elite.
              </p>
              <button className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-black bg-gradient-to-r from-orange-500 to-orange-600 rounded-full overflow-hidden hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-105">
                <span className="absolute inset-0 bg-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative flex items-center">
                  Shop Now <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
            </div>

            {/* Right Hero Visual */}
            <div className="animate-slide-right">
              <div className="relative h-80 md:h-96 bg-gradient-to-br from-orange-900/30 to-black/50 border-2 border-orange-500/30 rounded-3xl flex items-center justify-center hover:border-orange-500/60 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/20 group cursor-pointer overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 via-transparent to-orange-500/0 group-hover:from-orange-500/10 group-hover:to-orange-500/10 transition-all duration-500"></div>
                <div className="text-center z-10">
                  <div className="text-9xl mb-4 animate-bounce-slow">🐅</div>
                  <p className="text-orange-400 font-bold text-lg tracking-widest">CYBER PANTHER</p>
                  <p className="text-gray-400 text-sm mt-2">Premium Collection 2024</p>
                </div>
              </div>
            </div>
          </div>

          {/* Features Bar */}
          <div className="grid md:grid-cols-3 gap-8 mb-24">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="group bg-gradient-to-br from-orange-900/15 to-black/40 backdrop-blur-sm rounded-2xl p-6 border border-orange-500/25 hover:border-orange-500/60 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/20 hover:bg-gradient-to-br hover:from-orange-900/25 hover:to-black/50 animate-fade-in-up"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <Icon className="w-10 h-10 text-orange-500 mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-xl font-bold text-orange-400 mb-2">{feature.title}</h3>
                  <p className="text-gray-300">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="relative py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-transparent via-orange-950/10 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h3 className="text-4xl md:text-5xl font-bold text-orange-500 mb-4">Explore Categories</h3>
            <div className="h-1 w-24 bg-orange-500 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                className="group cursor-pointer animate-slide-up"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="bg-gradient-to-br from-orange-900/20 to-black/40 backdrop-blur-sm rounded-2xl p-8 border border-orange-500/30 hover:border-orange-500/60 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/20 text-center hover:-translate-y-2">
                  <div className="text-6xl mb-4 group-hover:scale-125 transition-transform duration-300 inline-block">{cat.icon}</div>
                  <h4 className="text-lg font-bold text-orange-400 uppercase tracking-wider">{cat.name}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="relative py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 animate-fade-in">
            <h3 className="text-4xl md:text-5xl font-bold text-orange-500 mb-4">Featured Products</h3>
            <div className="h-1 w-24 bg-orange-500"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, idx) => (
              <div
                key={product.id}
                className="group cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="bg-gradient-to-br from-orange-900/20 to-black/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-orange-500/30 hover:border-orange-500/60 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/20">
                  <div className="relative h-48 bg-gradient-to-br from-orange-900/30 to-black/50 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-orange-600/5 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                    <div className="text-7xl group-hover:scale-125 transition-transform duration-300 z-10">{product.image}</div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-lg font-bold text-orange-400 mb-2 line-clamp-2">{product.name}</h4>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-orange-500">{product.price}</span>
                      <button className="bg-orange-600 hover:bg-orange-500 text-black p-2 rounded-full transition-all duration-300 group-hover:scale-110">
                        <ShoppingBag className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-orange-900/40 to-black/40 backdrop-blur-md rounded-3xl p-12 border border-orange-500/50 text-center animate-fade-in hover:border-orange-500/80 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/20">
            <Zap className="w-12 h-12 text-orange-500 mx-auto mb-6" />
            <h3 className="text-4xl font-bold text-orange-400 mb-4">Limited Time Offer</h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Get 20% off on your first order. Use code <span className="text-orange-500 font-bold">APEX20</span> at checkout.
            </p>
            <button className="group relative inline-flex items-center justify-center px-10 py-4 text-lg font-bold text-black bg-gradient-to-r from-orange-500 to-orange-600 rounded-full overflow-hidden hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-105">
              <span className="absolute inset-0 bg-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative flex items-center">
                Claim Offer <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative mt-20 py-8 px-4 md:px-8 lg:px-16 border-t border-orange-500/20 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p className="mb-2">&copy; {new Date().getFullYear()} Cyber-Jungle E-Commerce. All rights reserved.</p>
          <p className="text-sm">Crafted by Jaydeep Kumar | Chandigarh University | Built with MERN Stack</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
