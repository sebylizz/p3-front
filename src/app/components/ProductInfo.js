export default function ProductInfo({ id, name, price, discount, colors, quantity, onColorSelect }) {
    return (
        <div>
            <h1 className="text-2xl font-bold">{name}</h1>

            <div className="flex items-center my-2">
                <span className="text-3xl font-bold text-red-600">{price} kr</span>
                {discount && (
                    <span className="ml-2 text-sm text-gray-500 line-through">{discount.originalPrice} kr</span>
                )}
            </div>

            <div className="flex items-center my-2">
                <p className="text-neutral-600">Color:</p>
                {colors && colors.length > 0 ? (
                    colors.map((color, index) => (
                        <img
                            key={index}
                            src={`/${id}/${color.id}/${color.mainImage}`}
                            alt={color.name}
                            className="h-8 w-8 ml-2 cursor-pointer border-2 rounded"
                            onClick={() => onColorSelect(index)}
                        />
                    ))
                ) : (
                    <span className="ml-2">No colors available</span>
                )}
            </div>

            <div className="my-2">
                {quantity === 0 ? (
                    <p className="text-sm text-red-500">Out of stock</p>
                ) : (
                    <p className="text-sm">Stock available: {quantity} items</p>
                )}
            </div>
        </div>
    );
}
