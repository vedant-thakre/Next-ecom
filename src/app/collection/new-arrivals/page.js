import CommonListing from "@/components/CommonListing";
import { productByCollection } from "@/services/product";

export default async function KidsAllProducts() {
  const getAllProducts = await productByCollection("new-arrivals");

  return <CommonListing data={getAllProducts && getAllProducts.data} />;
}
