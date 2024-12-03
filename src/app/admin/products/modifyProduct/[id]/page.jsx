// ProductPage.jsx

import getProductToModify from "@/app/lib/getProductToModify";
import ModifyProduct from "../Modify";

export const dynamicParams = true;

export async function getProduct(id) {
  const allProducts = await productFetcherJSX(); 
  const idProduct = allProducts.find((product) => product.id.toString() === id);
  return idProduct;
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = await getProductToModify(id);
  console.log(product);

  // if (!product) {
  //   notFound();
  // }

  return <ModifyProduct productData={product} />;
}
