import getTopElements from "./sortingBestSeller";

function getTopSellingProductsUsingHeap(colors, k) {
    if (colors.length === 0 || k <= 0) {
        return []; 
    }


    const arr = colors.map((color, index) => ({
        score: color.totalSales, 
        index,
    }));


    const topElements = getTopElements(arr, colors, k);


    return topElements.map(({ id }) => colors.find((color) => color.colorId === id));
}

export default getTopSellingProductsUsingHeap;
