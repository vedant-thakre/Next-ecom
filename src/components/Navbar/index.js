"use client";

import { GlobalContext } from "@/context";
import { adminNavOptions, navOptions } from "@/utils"
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoMdLogIn, IoMdLogOut } from "react-icons/io";
import { RiAdminLine, RiUserLine } from "react-icons/ri";

import React, { useContext, useEffect } from "react";
import CommonModal from "../CommonModel";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import CartModal from "../CartModel";


const NavItems = ({ isModalView = false, router}) => {

  const pathName = usePathname();
  const isAdmin = pathName.includes("admin-view");

  return (
    <div
      className={`item-center  justify-between w-full lg:flex lg:w-auto
      ${isModalView ? "" : "hidden"}`}
      id="nav-items"
    >
      <ul
        className={`flex flex-col p-4 md:p-0 mt-4 font-medium rounded-lg md:flex-row
           md:space-x-8 md:mt-0 md:bottom-0 bg-white `}
      >
        {isAdmin
          ? adminNavOptions.map((item) => (
              <li
                className=" cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded-md md:p-0"
                key={item.id}
                onClick={() => router.push(item.path)}
              >
                {item.label}
              </li>
            ))
          : navOptions.map((item) => (
              <li
                className=" cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded-md md:p-0"
                key={item.id}
                onClick={() => router.push(item.path)}
              >
                {item.label}
              </li>
            ))}
      </ul>
    </div>
  );
};

const Navbar = () => {
  const { showNavModal, setShowNavModal } = useContext(GlobalContext);
  const {
    user,
    isAuthUser,
    setUser,
    setIsAuthUser,
    currentUpdatedProduct,
    setCurrentUpdatedProduct,
    showCartModal,
    setShowCartModal,
  } = useContext(GlobalContext); 

  const pathName = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    setIsAuthUser(false);
    setUser(null);
    Cookies.remove('token');
    localStorage.clear();
    router.push("/");

  }
  const isAdminView = pathName.includes("admin-view");

  useEffect(() => {
    if (
      pathName !== "/admin-view/add-product" &&
      currentUpdatedProduct !== null
    ) {
      setCurrentUpdatedProduct(null);
    }
  }, [pathName])
  

  return (
    <>
      <nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2.5">
          <div
            onClick={() => router.push("/")}
            className="flex items-center cursor-pointer"
          >
            <span className="self-center text-xl cursor-pointer lg:text-2xl font-semibold whitespace-nowrap">
              Urbanmarket
            </span>
          </div>
          <div className="flex md:order-2 gap-2">
            {!isAdminView && isAuthUser ? (
              <div className="flex text-gray-500 mt-2 gap-8 mr-0 lg:mr-2">
                <div className="relative group">
                  <FaRegUserCircle
                    className="cursor-pointer text-xl hover:text-gray-950"
                    onClick={() => router.push("/account")}
                  />
                  <p className="text-[9px] absolute w-40px -left-3 -bottom-7 hidden group-hover:block text-white bg-gray-700 border border-gray-500 p-1 m-0 rounded-md">
                    Account
                  </p>
                </div>
                <div className="relative group">
                  <MdOutlineShoppingCart
                    className="cursor-pointer text-xl hover:text-gray-950"
                    onClick={() => router.push("/cart")}
                  />
                  <p className="text-[9px] absolute w-40px -left-1 -bottom-7 hidden group-hover:block text-white bg-gray-700 border border-gray-500 p-1 m-0 rounded-md">
                    Cart
                  </p>
                </div>
              </div>
            ) : null}
            {user?.role === "admin" ? (
              isAdminView ? (
                <div className="relative group  mt-2">
                  <RiUserLine
                    className="text-xl mx-4 text-gray-500 hover:text-gray-950 cursor-pointer"
                    onClick={() => router.push("/")}
                  />
                  <p className="text-[9px] absolute w-40px -bottom-7 hidden group-hover:block text-white bg-gray-700 border border-gray-500 p-1 m-0 rounded-md">
                    ClientView
                  </p>
                </div>
              ) : (
                <div className="relative group  mt-2">
                  <RiAdminLine
                    className="text-xl mx-4 text-gray-500 hover:text-gray-950 cursor-pointer"
                    onClick={() => router.push("/admin-view")}
                  />
                  <p className="text-[9px] absolute w-40px -bottom-7 hidden group-hover:block text-white bg-gray-700 border border-gray-500 p-1 m-0 rounded-md">
                    AdminView
                  </p>
                </div>
              )
            ) : null}
            {isAuthUser ? (
              <div className="relative group  mt-2">
                <IoMdLogOut
                  className="text-xl text-gray-500 hover:text-gray-950 cursor-pointer"
                  onClick={handleLogout}
                />
                <p className="text-[9px] absolute w-40px -bottom-7 -left-2 hidden group-hover:block text-white bg-gray-700 border border-gray-500 p-1 m-0 rounded-md">
                  Logout
                </p>
              </div>
            ) : (
              <div className="relative group  mt-2">
                <IoMdLogIn
                  className="text-xl text-gray-500 hover:text-gray-950 cursor-pointer"
                  onClick={() => router.push("/login")}
                />
                <p className="text-[9px] absolute w-40px -bottom-7 -left-2 hidden group-hover:block text-white bg-gray-700 border border-gray-500 p-1 m-0 rounded-md">
                  Login
                </p>
              </div>
            )}
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex cursor-pointer mt-0.5 ml-2 items-center p-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:ring-gray-200 "
              aria-controls="navbar-sticky"
              aria-expanded="false"
              onClick={() => setShowNavModal(true)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <NavItems router={router} isAdminView={isAdminView} />
        </div>
      </nav>
      {
        <CommonModal
          show={showNavModal}
          setShow={setShowNavModal}
          router={router}
          showModalTitle={false}
          mainContent={
            <NavItems router={router} isAdminView={true} isModalView={true} />
          }
        />
      }
      {showCartModal && <CartModal />}
    </>
  );
};

export default Navbar;
