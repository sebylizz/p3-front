export default function ProductInfo({ id, name, price, discount, colors, onColorSelect, selectedSize, colorIndex }) { 

    const selectedColor = colors[colorIndex];
    const selectedVariant = selectedColor?.variants?.find((variant) => variant.id === selectedSize);
    return (
        <div>
            <h1 className="text-2xl font-bold">{name}</h1>

            <div className="flex items-center my-2">
                <span className="text-3xl font-bold text-red-600">{price} kr</span>
                {discount && (
                    <span className="ml-2 text-sm text-gray-500 line-through">{discount.originalPrice} kr</span>
                )}
            </div>

            {colors && colors.length > 1 && ( 
                <div className="flex items-center my-2">
                    <p className="text-neutral-600">Color:</p>
                    {colors.map((color, index) => (
                        <img
                            key={index}
                            src={`/${id}/${color.id}/${color.mainImage}`}
                            alt={color.name}
                            className="h-8 w-8 ml-2 cursor-pointer border-2 rounded"
                            onClick={() => onColorSelect(index)}
                        />
                    ))}
                </div>
            )}

            <div className="my-2">
                {selectedSize === null ? (
                    <p className="text-sm text-gray-500">Please select a size</p>
                ) : selectedVariant?.quantity === 0 ? (
                    <p className="text-sm text-red-500">Out of stock</p>
                ) : (
                    <p className="text-sm">Stock available: {selectedVariant?.quantity}</p>
                )}
            </div>
        </div>
    );
}
