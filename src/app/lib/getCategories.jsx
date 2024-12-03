async function categoryFetcher() {
    try {
        const response = await fetch("http://localhost:8080/categories/getCategories");

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error:', error);
    }
}

export default categoryFetcher;
