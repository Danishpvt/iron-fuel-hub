import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { X, ShoppingCart, Star, ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useCompare } from "@/context/CompareContext";
import { useCart } from "@/context/CartContext";

const Compare = () => {
  const { compareItems, removeFromCompare, clearCompare } = useCompare();
  const { addToCart } = useCart();

  const allNutritionLabels = Array.from(
    new Set(
      compareItems.flatMap((p) => p.nutritionFacts?.map((n) => n.label) || [])
    )
  );

  const allIngredients = Array.from(
    new Set(compareItems.flatMap((p) => p.ingredients || []))
  );

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
              className="flex items-center justify-between"
            >
              <div>
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-4"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Shop
                </Link>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl">
                  PRODUCT <span className="text-gradient-gold">COMPARISON</span>
                </h1>
                <p className="text-muted-foreground text-lg mt-2">
                  Compare up to 4 products side by side
                </p>
              </div>
              {compareItems.length > 0 && (
                <Button variant="ghost" onClick={clearCompare} className="text-destructive">
                  Clear All
                </Button>
              )}
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {compareItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">📊</div>
              <h2 className="font-display text-2xl mb-2">No Products to Compare</h2>
              <p className="text-muted-foreground mb-6">
                Add products to compare from the shop page
              </p>
              <Link to="/shop">
                <Button variant="gold">Browse Products</Button>
              </Link>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="overflow-x-auto"
            >
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr>
                    <th className="text-left p-4 bg-card rounded-tl-lg font-display text-lg">
                      Feature
                    </th>
                    {compareItems.map((product) => (
                      <th key={product.id} className="p-4 bg-card text-center">
                        <div className="relative">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute -top-2 -right-2 h-6 w-6"
                            onClick={() => removeFromCompare(product.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-32 h-32 object-cover mx-auto rounded-lg mb-3"
                          />
                          <Link
                            to={`/product/${product.id}`}
                            className="font-display text-sm hover:text-primary transition-colors"
                          >
                            {product.name}
                          </Link>
                          <p className="text-xs text-muted-foreground mt-1">
                            {product.brand}
                          </p>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Price Row */}
                  <tr className="border-b border-border">
                    <td className="p-4 font-medium">Price</td>
                    {compareItems.map((product) => (
                      <td key={product.id} className="p-4 text-center">
                        <span className="text-xl font-bold text-primary">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className="block text-sm text-muted-foreground line-through">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Rating Row */}
                  <tr className="border-b border-border bg-card/50">
                    <td className="p-4 font-medium">Rating</td>
                    {compareItems.map((product) => (
                      <td key={product.id} className="p-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Star className="h-5 w-5 fill-primary text-primary" />
                          <span className="font-medium">{product.rating}</span>
                          <span className="text-sm text-muted-foreground">
                            ({product.reviewsCount})
                          </span>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Category Row */}
                  <tr className="border-b border-border">
                    <td className="p-4 font-medium">Category</td>
                    {compareItems.map((product) => (
                      <td key={product.id} className="p-4 text-center capitalize">
                        {product.category.replace("-", " ")}
                      </td>
                    ))}
                  </tr>

                  {/* Fitness Goals Row */}
                  <tr className="border-b border-border bg-card/50">
                    <td className="p-4 font-medium">Fitness Goals</td>
                    {compareItems.map((product) => (
                      <td key={product.id} className="p-4 text-center">
                        <div className="flex flex-wrap justify-center gap-1">
                          {product.fitnessGoal?.map((goal) => (
                            <span
                              key={goal}
                              className="px-2 py-0.5 text-xs rounded-full bg-primary/20 text-primary"
                            >
                              {goal}
                            </span>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Stock Row */}
                  <tr className="border-b border-border">
                    <td className="p-4 font-medium">Stock</td>
                    {compareItems.map((product) => (
                      <td key={product.id} className="p-4 text-center">
                        <span
                          className={`px-2 py-1 rounded text-sm ${
                            product.stock > 50
                              ? "bg-green-500/20 text-green-400"
                              : product.stock > 10
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {product.stock > 50
                            ? "In Stock"
                            : product.stock > 10
                            ? "Low Stock"
                            : "Limited"}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Nutrition Facts Header */}
                  <tr className="bg-gradient-gold">
                    <td
                      colSpan={compareItems.length + 1}
                      className="p-3 font-display text-background text-center"
                    >
                      Nutrition Facts
                    </td>
                  </tr>

                  {/* Nutrition Facts Rows */}
                  {allNutritionLabels.map((label, index) => (
                    <tr
                      key={label}
                      className={`border-b border-border ${
                        index % 2 === 0 ? "bg-card/50" : ""
                      }`}
                    >
                      <td className="p-4 font-medium">{label}</td>
                      {compareItems.map((product) => {
                        const fact = product.nutritionFacts?.find(
                          (n) => n.label === label
                        );
                        return (
                          <td key={product.id} className="p-4 text-center">
                            {fact?.value || "—"}
                          </td>
                        );
                      })}
                    </tr>
                  ))}

                  {/* Ingredients Header */}
                  <tr className="bg-gradient-gold">
                    <td
                      colSpan={compareItems.length + 1}
                      className="p-3 font-display text-background text-center"
                    >
                      Key Ingredients
                    </td>
                  </tr>

                  {/* Ingredients Rows */}
                  {allIngredients.slice(0, 6).map((ingredient, index) => (
                    <tr
                      key={ingredient}
                      className={`border-b border-border ${
                        index % 2 === 0 ? "bg-card/50" : ""
                      }`}
                    >
                      <td className="p-4 font-medium">{ingredient}</td>
                      {compareItems.map((product) => {
                        const hasIngredient = product.ingredients?.includes(ingredient);
                        return (
                          <td key={product.id} className="p-4 text-center">
                            {hasIngredient ? (
                              <span className="text-green-400">✓</span>
                            ) : (
                              <span className="text-muted-foreground">—</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}

                  {/* Usage Row */}
                  <tr className="border-b border-border bg-card/50">
                    <td className="p-4 font-medium">Usage</td>
                    {compareItems.map((product) => (
                      <td key={product.id} className="p-4 text-center text-sm">
                        {product.usage || "See product details"}
                      </td>
                    ))}
                  </tr>

                  {/* Add to Cart Row */}
                  <tr>
                    <td className="p-4"></td>
                    {compareItems.map((product) => (
                      <td key={product.id} className="p-4 text-center">
                        <Button
                          variant="gold"
                          onClick={() => addToCart(product)}
                          className="w-full"
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Compare;
