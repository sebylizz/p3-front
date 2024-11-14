async function productFetcher() {
    return fetch("http://localhost:8080/products/getproducts")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(async data => {
            let products = [];
            for (let i = 0; i < data.length; i++) {
                let product = {};
                product.id = data[i].id;
                product.name = data[i].name;
                product.size = data[i].size;
                product.price = data[i].price;
                product.img = data[i].image || "placeholder.jpg";
                product.main_image= data[i].mainImage;
                products.push(product);
            }

            return products;

        })
        .catch(error => {
            console.error('Error:', error);
        });
}

export default productFetcher;
