function productFetcher() {
    return fetch("https://kjaeldgaard.com/leghetto/products/getproducts")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {

            let products = [];
            for (let i = 0; i < data.length; i++) {
                let product = {};
                product.id = data[i].id;
                product.name = data[i].name;
                product.size = data[i].size;
                product.price = data[i].price;
                product.img = data[i].image || "placeholder.jpg";
                products.push(product);
            }

            console.log(products);
            return products;

        })
        .catch(error => {
            console.error('Error:', error);
        });
}

export default productFetcher;
