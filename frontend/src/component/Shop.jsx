import React, { useEffect, useState } from "react";
import { useProductStore } from "../zustand/product";
import { useCategoryStore } from "../zustand/category";
import SmallProduct from "./SmallProduct";
import ProductCarousel from "./ProductCarousel";
import { Search, Filter, Star, Zap, Grid3X3 } from 'lucide-react';

const Shop = () => {
  const { fetchTopProducts, fetchAllproducts, products: allProducts } =
    useProductStore();
  const { categories, getAllCategories } = useCategoryStore();

  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // LOAD DATA
  useEffect(() => {
    const loadData = async () => {
      try {
        await getAllCategories();
        const top = await fetchTopProducts();
        setTopProducts(top || []);
        await fetchAllproducts();
      } catch (err) {
        console.error("Error loading data:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // FILTER PRODUCTS
  const filterProducts = (products) => {
    return products.filter((product) => {
      const categoryName =
        categories.find((cat) => cat._id === product.category)?.name || "";

      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.brand.toLowerCase().includes(search.toLowerCase()) ||
        categoryName.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  };

  const filteredTopProducts = filterProducts(topProducts);
  const filteredAllProducts = filterProducts(allProducts);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-black via-orange-950 to-black text-orange-500">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-orange-500/30 rounded-full animate-spin"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-orange-400 text-xl mt-6 font-bold animate-pulse">Loading Cyber Gear...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-orange-950 to-black text-gray-100 font-sans overflow-x-hidden pt-4 sm:pt-6 md:pt-8 lg:pt-10">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">

        {/* 🔍 SEARCH & FILTER BAR */}
        <div className="mb-12 sm:mb-16 lg:mb-20 w-full flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center animate-fade-in">
          
          {/* Search Bar */}
          <div className="relative w-full sm:w-1/2 lg:w-2/5 group">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-orange-600/10 rounded-2xl blur-sm group-hover:blur transition-all duration-300 hidden sm:block"></div>
            <div className="relative">
              <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-orange-400 group-hover:text-orange-300 transition-colors duration-300" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products, brands, categories..."
                className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 rounded-xl sm:rounded-2xl 
                  bg-gradient-to-br from-orange-900/30 to-black/50 
                  backdrop-blur-lg text-gray-200 placeholder-gray-400 text-sm sm:text-base
                  border border-orange-500/40 focus:border-orange-500/80
                  focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-orange-500/30 
                  transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20
                  font-medium"
              />
            </div>
          </div>

          {/* Category Dropdown - FIXED TEXT COLOR */}
          <div className="relative w-full sm:w-1/3 lg:w-1/4 group">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-orange-600/10 rounded-2xl blur-sm group-hover:blur transition-all duration-300 hidden sm:block"></div>
            <div className="relative">
              <Filter className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-orange-400 group-hover:text-orange-300 transition-colors duration-300" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 sm:pl-12 pr-8 sm:pr-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl 
                  bg-gradient-to-br from-orange-900/30 to-black/50 
                  backdrop-blur-lg text-gray-200 border border-orange-500/40 
                  focus:border-orange-500/80 focus:outline-none 
                  focus:ring-2 sm:focus:ring-4 focus:ring-orange-500/30 
                  transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20
                  appearance-none cursor-pointer font-medium text-sm sm:text-base"
              >
                <option value="all" className="bg-gray-900 text-gray-200">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id} className="bg-gray-900 text-gray-200">
                    {cat.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <div className="w-2 h-2 border-r-2 border-b-2 border-orange-400 rotate-45"></div>
              </div>
            </div>
          </div>
        </div>

        {/* ⭐ TOP PICKS */}
        <section className="mb-16 sm:mb-20 lg:mb-24">
          <div className="mb-8 sm:mb-12 animate-slide-left">
            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="p-2 sm:p-3 bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-xl sm:rounded-2xl border border-orange-500/30">
                <Star className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-orange-400" />
              </div>
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-orange-500 mb-1 sm:mb-2 tracking-tight">
                  Top Picks
                </h2>
                <div className="h-1 sm:h-1.5 w-16 sm:w-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
              </div>
            </div>
            <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl pl-11 sm:pl-14 md:pl-16">
              Curated selection of our most premium and high-performance gear
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 sm:gap-8">
            
            {/* Products - 3 columns */}
            <div className="xl:col-span-3">
              {filteredTopProducts.length === 0 ? (
                <div className="bg-gradient-to-br from-orange-900/20 to-black/40 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16 border border-orange-500/25 text-center animate-fade-in hover:border-orange-500/40 transition-all duration-300">
                  <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">🔍</div>
                  <p className="text-gray-400 text-lg sm:text-xl font-medium">No top products found</p>
                  <p className="text-gray-500 text-sm sm:text-base mt-1 sm:mt-2">Try adjusting your search or filters</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                  {filteredTopProducts.map((product, idx) => (
                    <div
                      key={product._id}
                      className="animate-fade-in-up transform hover:scale-[1.02] transition-transform duration-300"
                      style={{ animationDelay: `${idx * 100}ms` }}
                    >
                      <SmallProduct
                        product={product}
                        categoryName={
                          categories.find((cat) => cat._id === product.category)
                            ?.name || ""
                        }
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 🚀 FEATURED CAROUSEL */}
            <div className="xl:col-span-1">
              <div className="sticky top-4 sm:top-6 md:top-8">
                <div className="mb-4 sm:mb-6 animate-slide-right">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <div className="p-1.5 sm:p-2 bg-gradient-to-br from-orange-400/20 to-orange-500/10 rounded-lg sm:rounded-xl border border-orange-400/30">
                      <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
                    </div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-400 tracking-wide">
                      Featured
                    </h2>
                  </div>
                  <div className="h-1 w-12 sm:w-16 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full"></div>
                </div>

                <div className="bg-gradient-to-br from-orange-900/25 to-black/50 backdrop-blur-lg rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-6 border border-orange-500/30 hover:border-orange-500/60 transition-all duration-500 hover:shadow-xl hover:shadow-orange-500/20 animate-fade-in">
                  <ProductCarousel products={topProducts.slice(0, 5)} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 📦 ALL PRODUCTS */}
        <section className="pb-16 sm:pb-20 lg:pb-24">
          <div className="mb-8 sm:mb-12 animate-slide-left">
            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="p-2 sm:p-3 bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-xl sm:rounded-2xl border border-orange-500/30">
                <Grid3X3 className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-orange-400" />
              </div>
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-orange-500 mb-1 sm:mb-2 tracking-tight">
                  All Products
                </h2>
                <div className="h-1 sm:h-1.5 w-16 sm:w-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
              </div>
            </div>
            <p className="text-gray-400 text-sm sm:text-base md:text-lg pl-11 sm:pl-14 md:pl-16">
              Explore our complete collection of cyber gear and accessories
            </p>
          </div>

          {filteredAllProducts.length === 0 ? (
            <div className="bg-gradient-to-br from-orange-900/20 to-black/40 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16 border border-orange-500/25 text-center animate-fade-in hover:border-orange-500/40 transition-all duration-300">
              <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">🎯</div>
              <p className="text-gray-400 text-lg sm:text-xl font-medium">No products match your search</p>
              <p className="text-gray-500 text-sm sm:text-base mt-1 sm:mt-2">Try different keywords or browse all categories</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 md:gap-6">
              {filteredAllProducts.map((product, idx) => (
                <div
                  key={product._id}
                  className="animate-fade-in-up transform hover:scale-[1.02] transition-transform duration-300"
                  style={{ animationDelay: `${idx * 30}ms` }}
                >
                  <SmallProduct
                    product={product}
                    categoryName={
                      categories.find((cat) => cat._id === product.category)
                        ?.name || ""
                    }
                  />
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
};

export default Shop;