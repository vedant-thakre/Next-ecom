import CommonListing from "@/components/CommonListing";
import { productByCollection } from "@/services/product";

export default async function KidsAllProducts() {
  const getAllProducts = await productByCollection("fresh-feb");

  return <CommonListing data={getAllProducts && getAllProducts.data} />;
}
