export default function quantityAddLimit(productId, currentQuantity, products) {

    const ids = productId.split('/').map((id) => parseInt(id));
    const [productIdNum, colorIdNum, variantIdNum] = ids;

    const product = products.find((p) => p.id === productIdNum);
    if (!product) {
        return false;
    }

    const color = product.colors.find((c) => c.id === colorIdNum);
    if (!color) {
        return false;
    }

    const variant = color.variants.find((v) => v.id === variantIdNum);
    if (!variant) {
        return false;
    }

    const maxQuantity = variant.quantity || 0;
    const canAddMore = currentQuantity < maxQuantity;

    return canAddMore;
}
