import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "@/types";
import { toast } from "sonner";

interface CompareContextType {
  compareItems: Product[];
  addToCompare: (product: Product) => void;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  isInCompare: (productId: string) => boolean;
  maxItems: number;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

const MAX_COMPARE_ITEMS = 4;

export const CompareProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [compareItems, setCompareItems] = useState<Product[]>([]);

  const addToCompare = (product: Product) => {
    if (compareItems.length >= MAX_COMPARE_ITEMS) {
      toast.error(`You can only compare up to ${MAX_COMPARE_ITEMS} products`);
      return;
    }
    if (compareItems.find((item) => item.id === product.id)) {
      toast.info(`${product.name} is already in comparison`);
      return;
    }
    setCompareItems((prev) => [...prev, product]);
    toast.success(`Added ${product.name} to comparison`);
  };

  const removeFromCompare = (productId: string) => {
    setCompareItems((prev) => {
      const item = prev.find((i) => i.id === productId);
      if (item) {
        toast.info(`Removed ${item.name} from comparison`);
      }
      return prev.filter((item) => item.id !== productId);
    });
  };

  const clearCompare = () => {
    setCompareItems([]);
    toast.info("Comparison cleared");
  };

  const isInCompare = (productId: string) => {
    return compareItems.some((item) => item.id === productId);
  };

  return (
    <CompareContext.Provider
      value={{
        compareItems,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
        maxItems: MAX_COMPARE_ITEMS,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error("useCompare must be used within a CompareProvider");
  }
  return context;
};
