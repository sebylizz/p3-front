'use client';

export default function SizeSelector({ sizes, onSizeSelect }) {
    return (
        <div className="my-4">
            <label htmlFor="size" className="block text-neutral-600">Size:</label>
            <select
                id="size"
                className="border border-neutral-300 rounded p-2 w-full"
                onChange={(e) => onSizeSelect(parseInt(e.target.value))}
            >
                <option value="">Select size</option>
                {sizes.map((size) => (
                    <option key={size.id} value={size.id}>{size.name}</option>
                ))}
            </select>
        </div>
    );
}
