import { useMemo } from "react";
import { useSelector } from "react-redux";
import "../styles/ProductList.css";
import ProductCard from "./ProductCard";

function ProductList() {
  const products = useSelector(state => state.products.products);
  const filter = useSelector(state => state.products.filter);

  const filteredProducts = useMemo(() => {
    if (!filter.trim()) return products;
    return products.filter(product =>
      product.name.toLowerCase().includes(filter.toLowerCase()) ||
      product.category.toLowerCase().includes(filter.toLowerCase())
    );
  }, [products, filter]);

  if (filteredProducts.length === 0 && filter.trim()) {
    return (
      <div className="emptyState">
        <div className="emptyIcon">🔍</div>
        <p className="emptyText">
          No products found for "{filter}"
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="productList">
        {filteredProducts.length === 0 ? (
          <div className="emptyState">
            <div className="emptyIcon">📦</div>
            <p className="emptyText">No products available</p>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))
        )}
      </div>
    </>
  );
}

export default ProductList;
