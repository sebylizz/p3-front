'use client';

export default function SizeSelector({ sizes, onSizeSelect, colorIndex, colors }) {
    const selectedColor = colors[colorIndex];
    const selectedVariant = (size) => selectedColor?.variants?.find((variant) => variant.size === size);
    
    return (
        <div className="my-4">
            <label htmlFor="size" className="block text-neutral-600">Size:</label>
            <select
                id="size"
                className="border border-neutral-300 rounded p-2 w-full"
                onChange={(e) => {
                    const value = e.target.value;
                    onSizeSelect(value === "" ? null : parseInt(value, 10));
                }}
            >
                <option value="">Select size</option>
                {sizes.map((size) => {
                    const variant = selectedVariant(size.name);
                return (
                <option
                    key={size.id}
                    value={size.id}
                    disabled={!variant || variant.quantity < 1}
                >
                    {size.name} {variant && variant.quantity === 0 ? "*Out of Stock*" : ""}
                </option>
                );
                })}
            </select>
        </div>
    );
}
