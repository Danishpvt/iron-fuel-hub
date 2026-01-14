import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Star, ShoppingCart, Heart, GitCompare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { useCompare } from "@/context/CompareContext";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();
  const inCompare = isInCompare(product.id);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative rounded-xl border border-border bg-card overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-elevated"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-secondary/30">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isBestSeller && (
            <Badge variant="bestseller" className="text-xs">
              Best Seller
            </Badge>
          )}
          {product.isNewArrival && (
            <Badge variant="gold" className="text-xs">
              New
            </Badge>
          )}
          {discount > 0 && (
            <Badge variant="sale" className="text-xs">
              -{discount}%
            </Badge>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 rounded-full"
          >
            <Heart className="h-4 w-4" />
          </Button>
          <Button
            variant={inCompare ? "gold" : "secondary"}
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => inCompare ? removeFromCompare(product.id) : addToCompare(product)}
          >
            <GitCompare className="h-4 w-4" />
          </Button>
        </div>

        {/* Add to Cart Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-background/95 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <Button
            variant="gold"
            className="w-full"
            onClick={() => addToCart(product)}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs text-muted-foreground mb-1">{product.brand}</p>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-sm lg:text-base line-clamp-2 hover:text-primary transition-colors mb-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <Star className="h-4 w-4 fill-primary text-primary" />
          <span className="text-sm font-medium">{product.rating}</span>
          <span className="text-xs text-muted-foreground">
            ({product.reviewsCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-primary">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
