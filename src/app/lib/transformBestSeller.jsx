function transformBestSellersToProductFormat(bestSellers) {
    const groupedProducts = {};
    const productOrder = []; 

    bestSellers.forEach((item) => {
        if (!groupedProducts[item.productId]) {
            groupedProducts[item.productId] = {
                id: item.productId,
                name: item.productName,
                price: item.price,
                colors: [],
            };
            productOrder.push(item.productId);
        }
        groupedProducts[item.productId].colors.push({
            id: item.colorId,
            name: item.colorName,
            mainImage: item.mainImage,
            totalSales: item.totalSales,
        });
    });


    return productOrder.map((productId) => groupedProducts[productId]);
}

export default transformBestSellersToProductFormat;
