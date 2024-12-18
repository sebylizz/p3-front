"use client";

import flattenProductsByColors from "./lib/flattenProductsByColor";
import getTopSellingProductsUsingHeap from "./lib/getBestSeller";
import { useProducts } from "./context/productContext";
import BrowseProductSlider from "./components/browseProductSlider";
import transformBestSellersToProductFormat from "./lib/transformBestSeller";
import PictureSlider from "./components/PictureSlider";

export default function HomePage() {
  const { products } = useProducts();
  const colors = flattenProductsByColors(products);
  const bestSellers = getTopSellingProductsUsingHeap(colors, 10);
  const transformedBestSellers =
    transformBestSellersToProductFormat(bestSellers);

  return (
    
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2rem",
        padding: "2rem 10%",
        backgroundColor: "#f9f9f9",
      }}
    >
      <PictureSlider />
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
          width: "100%",
          maxWidth: "1200px",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            color: "#333",
            textAlign: "center",
            marginBottom: "1rem",
          }}
        >
          Bestsellers
        </h1>
        <BrowseProductSlider
          filteredProducts={transformedBestSellers}
        ></BrowseProductSlider>
      </section>
    </main>
  );
}
