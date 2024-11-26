'use client';

import { useRouter } from 'next/navigation';


export default function ProductCard({ name, image, price, description, productId, colorId }) {
  const router = useRouter();
  console.log("before " + colorId);
  const handleCardClick = () => {
    const url = `/productPage/${productId}?colorId=${colorId}`
    console.log('Navigating to:', url); // Debugging
    router.push(url);
  };



  return (
    <div
      className="border border-neutral-200 rounded-md hover:shadow-lg max-w-[300px]"
      onClick={handleCardClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="relative">
        <img
          src={image}
          alt={name}
          onError={(e) => (e.target.src = 'placeholder.jpg')} // Fallback image
          className="object-cover h-auto rounded-md aspect-square"
          width="300"
          height="300"
        />
      </div>
      <div className="p-4 border-t border-neutral-200">
        <div className="font-bold">{name}</div>
        {description && (
          <p className="block py-2 font-normal typography-text-sm text-neutral-700">
            {description}
          </p>
        )}
        <span className="block pb-2 font-bold typography-text-lg">{price} DKK</span>
      </div>
    </div>
  );
}
