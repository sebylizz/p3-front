// utils/searchProducts.js

async function SearchFunction(query) {
    try {
        const response = await fetch(`http://localhost:8080/products/search?q=${encodeURIComponent(query)}`);
        if (!response.ok) {
            throw new Error('Failed to fetch search results');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

export default SearchFunction;

