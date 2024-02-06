"use client";
import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [showNavModal, setShowNavModal] = useState(false);
  const [pageLoader, setpageLoader] = useState(false);
  const [componentLoader, setComponentLoader] = useState({ loading: false, id: ''});
  const [isAuthUser, setIsAuthUser] = useState(null);
  const [currentUpdatedProduct, setCurrentUpdatedProduct] = useState(null);
  const [user, setUser] = useState(null);


  useEffect(() => {
    if(Cookies.get('token') !== undefined){
      setIsAuthUser(true);
      const userData = JSON.parse(localStorage.getItem('user')) || {};
      setUser(userData);
    }else{
      setIsAuthUser(false);
    }
  }, [Cookies])
  

  return (
    <GlobalContext.Provider
      value={{
        showNavModal,
        setShowNavModal,
        pageLoader, 
        setpageLoader,
        currentUpdatedProduct, 
        setCurrentUpdatedProduct,
        componentLoader, 
        setComponentLoader,
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
