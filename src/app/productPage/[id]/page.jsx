'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import ProductInfo from '../../components/ProductInfo';
import SizeSelector from '../../components/SizeSelector';
import AddToCartButton from '../../components/AddToCartButton';
import { useProducts } from '../../context/productContext';

export default function ProductDetailsPage() {
    const { id } = useParams();
    const searchParams = useSearchParams();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedSize, setSelectedSize] = useState(null);
    const [currentColorIndex, setCurrentColorIndex] = useState(0);
    const { products, loading } = useProducts();

    const product = products.find(p => p.id === parseInt(id));
    const colorIdFromQuery = searchParams.get('colorId');

    useEffect(() => {
        if (product && colorIdFromQuery) {
          const colorIndex = product.colors.findIndex(
            (color) => color.id === parseInt(colorIdFromQuery)
          );
          console.log('Parsed colorIdFromQuery:', colorIdFromQuery); // Debugging
          if (colorIndex !== -1) {
            setCurrentColorIndex(colorIndex);
          }
        }
      }, [product, colorIdFromQuery]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!product) {
        return <p>Product not found or failed to load.</p>;
    }

    // Prepare image paths with folder prefix
    const images = product.colors[currentColorIndex].images
        .split(',')
        .map(img => `/${id}/${product.colors[currentColorIndex].id}/${img.trim()}`);
    images.unshift(`/${product.id}/${product.colors[currentColorIndex].id}/${product.colors[currentColorIndex].mainImage}`);

    const currentImage = images[currentIndex];

    // Functions to navigate images
    const handleNextImage = () => {
        setCurrentIndex((currentIndex + 1) % images.length);
    };

    const handlePrevImage = () => {
        setCurrentIndex((currentIndex - 1 + images.length) % images.length); // Loop to the end if at the start
    };

    const handleColorSelect = (index) => {
        setCurrentColorIndex(index);
        setCurrentIndex(0);
    };

    const sizes = product.colors[0].variants.map(variant => variant.size);

    return (
        <div className="flex p-8">
            {/* Left Column: Image Viewer with Arrows */}
            <div className="w-1/2 flex justify-center items-center relative">
                {/* Left Arrow */}
                <button
                    onClick={handlePrevImage}
                    className="absolute left-0 px-2 py-1 bg-gray-500 bg-opacity-50 text-white rounded-full hover:bg-opacity-80"
                    style={{ zIndex: 10 }}
                >
                    &#10094; {/* Left arrow symbol */}
                </button>

                {/* Main Image */}
                <img
                    src={currentImage}
                    alt={product.name}
                    className="rounded-md object-cover"
                    style={{ minHeight: '700px', maxHeight: '700px', height: 'auto' }}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/placeholder.jpg';
                    }}
                />

                {/* Right Arrow */}
                <button
                    onClick={handleNextImage}
                    className="absolute right-0 px-2 py-1 bg-gray-500 bg-opacity-50 text-white rounded-full hover:bg-opacity-80"
                    style={{ zIndex: 10 }}
                >
                    &#10095; {/* Right arrow symbol */}
                </button>
            </div>

            <div className="w-1/2 pl-4">
                <ProductInfo
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    discount={product.discount}
                    colors={product.colors}
                    quantity={product.quantity}
                    onColorSelect={handleColorSelect}
                />
                <SizeSelector sizes={sizes} onSizeSelect={setSelectedSize} />
                <AddToCartButton selectedSize={selectedSize} product={product} />
            </div>
        </div>
    );
}
