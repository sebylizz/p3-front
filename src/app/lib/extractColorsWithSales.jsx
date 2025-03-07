function extractColorsWithSales(products) {
    return products.flatMap((product) =>
        product.colors.map((color) => ({
            productId: product.id,
            productName: product.name,
            colorId: color.id,
            colorName: color.name,
            totalSales: color.totalSales || 0, 
            price: product.price,
            mainImage: color.mainImage,
        }))
    );
}

export default extractColorsWithSales;