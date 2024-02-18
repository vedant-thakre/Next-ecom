import { Suspense } from "react";
import ComponentLoader from "@/components/Loader/ComponentLoader";
import CheckoutPage from "@/components/CheckoutPage";

function Checkout() {
  return (
    <Suspense fallback={<ComponentLoader/>}>
      <CheckoutPage/>
    </Suspense>
  );
}

export default Checkout;
