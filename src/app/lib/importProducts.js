'use server'

import fs from 'fs';

function productFetcher() {
    return fetch("http://localhost:8080/products/getproducts")
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

                if (!fs.existsSync('./' + data[i].image)) {
                    product.img = 'placeholder.jpg';
                } else {
                    product.img = data[i].image;
                }
                products.push(product);
            }

            return products;

        })
        .catch(error => {
            console.error('Error:', error);
        });
}

export default productFetcher;
