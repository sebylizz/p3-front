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
                product.quantity = data[i].quantity;
                product.name = data[i].name;
                product.size = data[i].size;
                product.price = data[i].price;
                product.img = data[i].id+"/"+data[i].image;
                product.mainImage= data[i].id+"/"+data[i].mainImage || "placeholder.jpg"
                products.push(product);
            }

            return products;

        })
        .catch(error => {
            console.error('Error:', error);
        });
}

export default productFetcher;
