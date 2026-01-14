import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, Grid, List, X } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { products, categories, brands, fitnessGoals } from "@/data/products";

const Shop = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedGoal, setSelectedGoal] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Brand filter
    if (selectedBrand) {
      result = result.filter((p) => p.brand === selectedBrand);
    }

    // Goal filter
    if (selectedGoal) {
      result = result.filter((p) => p.fitnessGoal?.includes(selectedGoal));
    }

    // Price filter
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sorting
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "bestseller":
        result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
        break;
      default:
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, selectedBrand, selectedGoal, priceRange, sortBy]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedBrand("");
    setSelectedGoal("");
    setPriceRange([0, 100]);
    setSortBy("featured");
  };

  const hasActiveFilters = searchQuery || selectedCategory || selectedBrand || selectedGoal;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 lg:pt-24">
        {/* Header */}
        <div className="bg-gradient-card border-b border-border">
          <div className="container mx-auto px-4 py-8 lg:py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-4">
                ALL <span className="text-gradient-gold">PRODUCTS</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Browse our complete collection of premium supplements
              </p>
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Search & Controls */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-12 pr-4 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Controls */}
            <div className="flex gap-2">
              <Button
                variant="secondary"
                className="lg:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-12 px-4 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="bestseller">Best Sellers</option>
              </select>

              <div className="hidden lg:flex border border-border rounded-lg overflow-hidden">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Filters Sidebar */}
            <aside
              className={`${
                showFilters ? "fixed inset-0 z-50 bg-background p-4 overflow-auto" : "hidden"
              } lg:block lg:relative lg:w-64 lg:flex-shrink-0`}
            >
              <div className="lg:sticky lg:top-24 space-y-6">
                {showFilters && (
                  <div className="flex justify-between items-center lg:hidden mb-4">
                    <h2 className="font-display text-xl">Filters</h2>
                    <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                )}

                {hasActiveFilters && (
                  <Button variant="ghost" onClick={clearFilters} className="text-primary">
                    Clear All Filters
                  </Button>
                )}

                {/* Categories */}
                <div>
                  <h3 className="font-display text-lg mb-3">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <label key={cat.id} className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === cat.slug}
                          onChange={() =>
                            setSelectedCategory(selectedCategory === cat.slug ? "" : cat.slug)
                          }
                          className="w-4 h-4 accent-primary"
                        />
                        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                          {cat.name} ({cat.productCount})
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Brands */}
                <div>
                  <h3 className="font-display text-lg mb-3">Brands</h3>
                  <div className="space-y-2">
                    {brands.map((brand) => (
                      <label key={brand.id} className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="radio"
                          name="brand"
                          checked={selectedBrand === brand.name}
                          onChange={() =>
                            setSelectedBrand(selectedBrand === brand.name ? "" : brand.name)
                          }
                          className="w-4 h-4 accent-primary"
                        />
                        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                          {brand.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Fitness Goals */}
                <div>
                  <h3 className="font-display text-lg mb-3">Fitness Goal</h3>
                  <div className="flex flex-wrap gap-2">
                    {fitnessGoals.map((goal) => (
                      <button
                        key={goal}
                        onClick={() => setSelectedGoal(selectedGoal === goal ? "" : goal)}
                        className={`px-3 py-1.5 text-xs rounded-full border transition-colors ${
                          selectedGoal === goal
                            ? "bg-primary text-primary-foreground border-primary"
                            : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                        }`}
                      >
                        {goal}
                      </button>
                    ))}
                  </div>
                </div>

                {showFilters && (
                  <Button
                    variant="gold"
                    className="w-full lg:hidden"
                    onClick={() => setShowFilters(false)}
                  >
                    Apply Filters
                  </Button>
                )}
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-4">
                Showing {filteredProducts.length} products
              </p>

              {filteredProducts.length > 0 ? (
                <div
                  className={`grid gap-6 ${
                    viewMode === "grid"
                      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                      : "grid-cols-1"
                  }`}
                >
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No products found matching your criteria.</p>
                  <Button variant="gold-outline" onClick={clearFilters} className="mt-4">
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
