import { ShoppingBag, Zap, ArrowRight, Star, Truck, Lock } from 'lucide-react';
import { Link } from "react-router-dom";

const HomePage = () => {
  const products = [
    { id: 1, name: "Chocolate Truffle Box", price: "₹899", image: "🍫" },
    { id: 2, name: "Kesar Ladoo Premium", price: "₹499", image: "🍯" },
    { id: 3, name: "Rose Milk Cake", price: "₹699", image: "🎂" },
    { id: 4, name: "Neon Candy Mix", price: "₹299", image: "🍬" },
  ];

  const categories = [
    { name: 'Traditional Mithai', icon: '🍥' },
    { name: 'Chocolates', icon: '🍫' },
    { name: 'Bakery', icon: '🎂' },
    { name: 'Limited Edition', icon: '✨' },
  ];

  const features = [
    { icon: Truck, title: 'Fast Delivery', desc: 'Fresh sweets delivered in 24–48 hours' },
    { icon: Lock, title: 'Hygienic Packing', desc: 'Sealed & food-grade packaging' },
    { icon: Star, title: 'Premium Taste', desc: 'Handcrafted by expert halwais' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-orange-950 to-black text-white overflow-hidden">

      {/* Navigation */}
      <nav className="relative z-50 py-6 px-4 md:px-8 lg:px-16 border-b border-orange-500/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3 group cursor-pointer animate-fade-in">
            <ShoppingBag className="w-8 h-8 text-orange-500 group-hover:rotate-12 transition-transform duration-300" />
            <h1 className="text-3xl font-bold text-orange-500 tracking-widest">CYBER SWEETS</h1>
          </div>
          <div className="flex space-x-8">
            <Link to="/shop" className="text-gray-300 hover:text-orange-400 transition-colors duration-300 font-medium">Shop</Link>
            <Link to="/about" className="text-gray-300 hover:text-orange-400 transition-colors duration-300 font-medium">About</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-16 md:py-32 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center mb-20">

          {/* Left */}
          <div className="animate-slide-left">
            <h2 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
              Taste the <span className="text-orange-500 block mt-2">Sweet Future</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-lg">
              Premium handcrafted sweets with a modern twist. Fresh, flavorful, unforgettable.
            </p>
            <button className="group inline-flex items-center px-8 py-4 font-bold text-black bg-gradient-to-r from-orange-500 to-orange-600 rounded-full hover:scale-105 transition">
              Order Now <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Right */}
          <div className="animate-slide-right">
            <div className="relative h-80 md:h-96 border-2 border-orange-500/30 rounded-3xl flex items-center justify-center hover:border-orange-500/60 transition group">
              <div className="text-center z-10">
                <div className="text-9xl mb-4 animate-bounce-slow">🍰</div>
                <p className="text-orange-400 font-bold tracking-widest">SIGNATURE SWEETS</p>
                <p className="text-gray-400 text-sm mt-2">Festive Collection 2025</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="bg-orange-900/15 p-6 rounded-2xl border border-orange-500/25 hover:border-orange-500/60 transition">
                <Icon className="w-10 h-10 text-orange-500 mb-4" />
                <h3 className="text-xl font-bold text-orange-400 mb-2">{f.title}</h3>
                <p className="text-gray-300">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <div key={i} className="text-center bg-orange-900/20 p-8 rounded-2xl border border-orange-500/30 hover:-translate-y-2 transition">
              <div className="text-6xl mb-4">{cat.icon}</div>
              <h4 className="text-orange-400 font-bold">{cat.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map(p => (
            <div key={p.id} className="bg-orange-900/20 rounded-2xl border border-orange-500/30 hover:border-orange-500/60 transition">
              <div className="h-48 flex items-center justify-center text-7xl">{p.image}</div>
              <div className="p-6">
                <h4 className="text-orange-400 font-bold mb-2">{p.name}</h4>
                <div className="flex justify-between items-center">
                  <span className="text-orange-500 text-xl font-bold">{p.price}</span>
                  <ShoppingBag className="w-5 h-5 text-black bg-orange-500 p-1 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-400 border-t border-orange-500/20">
        <p>© {new Date().getFullYear()} Cyber Sweets</p>
        <p className="text-sm">Built by Jaydeep Kumar | MERN Stack</p>
      </footer>

    </div>
  );
};

export default HomePage;
