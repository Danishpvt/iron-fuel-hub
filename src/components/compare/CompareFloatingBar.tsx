import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { X, GitCompare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCompare } from "@/context/CompareContext";

const CompareFloatingBar = () => {
  const { compareItems, removeFromCompare, clearCompare, maxItems } = useCompare();

  if (compareItems.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border shadow-elevated"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <GitCompare className="h-5 w-5 text-primary" />
                <span className="font-display text-sm">
                  Compare ({compareItems.length}/{maxItems})
                </span>
              </div>

              <div className="hidden sm:flex items-center gap-2">
                {compareItems.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="relative group"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-lg border border-border"
                    />
                    <button
                      onClick={() => removeFromCompare(product.id)}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-destructive rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={clearCompare}>
                Clear
              </Button>
              <Link to="/compare">
                <Button variant="gold" size="sm" disabled={compareItems.length < 2}>
                  Compare Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CompareFloatingBar;
