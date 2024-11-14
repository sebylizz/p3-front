import { SfButton, SfLink, SfIconShoppingCart } from '@storefront-ui/react';

export default function ProductCard({ name, image, price, description }) {
  return (
    <div className="border border-neutral-200 rounded-md hover:shadow-lg max-w-[300px]">
      <div className="relative">
        <SfLink href="#" className="block">
          <img
            src={image}
            alt={name}
            onError={(e) => e.target.src = 'placeholder.jpg'} // Fallback image
            className="object-cover h-auto rounded-md aspect-square"
            width="300"
            height="300"
          />
        </SfLink>
      </div>
      <div className="p-4 border-t border-neutral-200">
        <SfLink href="#" variant="secondary" className="no-underline">
          {name}
        </SfLink>
        {description && (
          <p className="block py-2 font-normal typography-text-sm text-neutral-700">
            {description}
          </p>
        )}
        <span className="block pb-2 font-bold typography-text-lg">{price} DKK</span>
        <SfButton size="sm" slotPrefix={<SfIconShoppingCart size="sm" />}>
          Add to cart
        </SfButton>
      </div>
    </div>
  );
}
