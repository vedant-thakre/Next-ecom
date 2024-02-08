"use client";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext(null);

export const initialCheckoutFormData = {
  shippingAddress: {},
  paymentMethod: "",
  totalPrice: 0,
  isPaid: false,
  paidAt: new Date(),
  isProcessing: true,
};
const protectedRoutes = ["/cart", "/checkout", "/account", "/orders", "/admin-view"];

const protectedAdminRoutes = [
  "/admin-view",
  "/admin-view/add-product",
  "/admin-view/all-products",
];


export default function GlobalState({ children }) {
  const [showNavModal, setShowNavModal] = useState(false);
  const [pageLoader, setpageLoader] = useState(false);
  const [componentLoader, setComponentLoader] = useState({ loading: false, id: ''});
  const [isAuthUser, setIsAuthUser] = useState(null);
  const [currentUpdatedProduct, setCurrentUpdatedProduct] = useState(null);
  const [user, setUser] = useState(null);
  const [showCartModal, setShowCartModal] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [addressFormData, setAddressFormData] = useState({
    fullName: "",
    city: "",
    phone: "",
    country: "",
    postalCode: "",
    address: "",
  });

  const [checkoutFormData, setCheckoutFormData] = useState(
    initialCheckoutFormData
  );

  const [allOrdersForUser, setAllOrdersForUser] = useState([]);
  const [orderDetails, setOrderDetails] = useState(null);
  const [allOrdersForAllUsers, setAllOrdersForAllUsers] = useState([]);

  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if (Cookies.get("token") !== undefined) {
      setIsAuthUser(true);
      const userData = JSON.parse(localStorage.getItem("user")) || {};
      const getCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      setUser(userData);
      setCartItems(getCartItems);
    } else {
      setIsAuthUser(false);
      setUser({}); // unauthenticated user
    }
  }, [Cookies]);

   useEffect(() => {
     if (
       pathName !== "/register" &&
       !pathName.includes("product") &&
       pathName !== "/" &&
       user &&
       Object.keys(user).length === 0 &&
       protectedRoutes.includes(pathName) > -1
     )
       router.push("/login");
   }, [user, pathName]);

   useEffect(() => {
     if (
       user !== null &&
       user &&
       Object.keys(user).length > 0 &&
       user?.role !== "admin" &&
       protectedAdminRoutes.indexOf(pathName) > -1
     )
       router.push("/unauthorized-page");
   }, [user, pathName]);
  

  return (
    <GlobalContext.Provider
      value={{
        showNavModal,
        setShowNavModal,
        allOrdersForUser,
        setAllOrdersForUser,
        allOrdersForAllUsers,
        setAllOrdersForAllUsers,
        orderDetails,
        setOrderDetails,
        pageLoader,
        setpageLoader,
        currentUpdatedProduct,
        setCurrentUpdatedProduct,
        componentLoader,
        addresses,
        setAddresses,
        addressFormData,
        setAddressFormData,
        setComponentLoader,
        showCartModal,
        cartItems,
        setCartItems,
        setShowCartModal,
        checkoutFormData,
        setCheckoutFormData,
        isAuthUser,
        setIsAuthUser,
        user,
        setUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
