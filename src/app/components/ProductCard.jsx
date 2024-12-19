'use client';

import { useRouter } from 'next/navigation';


export default function ProductCard({ name, image, price, productId, colorId }) {
  const router = useRouter();
  const handleCardClick = () => {
    const url = `/productPage/${productId}?colorId=${colorId}`
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
          onError={(e) => (e.target.src = 'placeholder.jpg')}
          className="object-cover h-auto rounded-md aspect-square"
          width="300"
          height="300"
        />
      </div>
      <div className="p-4 border-t border-neutral-200">
        <div className="font-bold">{name}</div>
        <span className="block pb-2 font-bold typography-text-lg">{price} DKK</span>
      </div>
    </div>
  );
}
