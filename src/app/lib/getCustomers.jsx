async function customerFetcher(offset = 0, limit = 10) {
    try {
        const response = await fetch(`http://localhost:8080/customers/getcustomers?offset=${offset}&limit=${limit}`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error:', error);
    }
}

export default customerFetcher;