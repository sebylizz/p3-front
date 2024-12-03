function transformBestSellersToProductFormat(bestSellers) {
    const groupedProducts = {};

    bestSellers.forEach((item) => {
        if (!groupedProducts[item.productId]) {
            groupedProducts[item.productId] = {
                id: item.productId,
                name: item.productName,
                price: item.price,
                colors: [],
            };
        }
        groupedProducts[item.productId].colors.push({
            id: item.colorId,
            name: item.colorName,
            mainImage: item.mainImage,
            totalSales: item.totalSales,
        });
    });

    return Object.values(groupedProducts);
}

export default transformBestSellersToProductFormat;
